import { env } from '../config/env.js';
import { withTransaction } from '../config/database.js';
import { findBookingByDbId, findBookingByIdAndUserId, updateBooking } from '../models/bookingModel.js';
import {
  createPayment,
  findPaymentByBookingId,
  findPaymentByProviderOrderCode,
  updatePayment,
} from '../models/paymentModel.js';
import { findTourById } from '../models/tourModel.js';
import { ApiError } from '../utils/apiError.js';
import { createPayosPaymentLink, getPayosPaymentLink, verifyPayosWebhook } from './payosClient.js';

const PAYOS_METHOD = 'payos';
const PAYOS_PROVIDER = 'payos';

function createSqlDateTime() {
  return new Date().toISOString().slice(0, 19).replace('T', ' ');
}

function createTimelineTime() {
  return new Date().toISOString().slice(0, 16).replace('T', ' ');
}

function appendTimelineItem(timeline, title, detail) {
  return [
    ...(Array.isArray(timeline) ? timeline : []),
    {
      detail,
      time: createTimelineTime(),
      title,
    },
  ];
}

function generatePayosOrderCode() {
  return Number(`${Date.now()}${Math.floor(Math.random() * 90 + 10)}`);
}

function buildPayosRedirectUrl(configuredUrl, bookingId, result) {
  const fallbackUrl = new URL(`/payment/${encodeURIComponent(bookingId)}`, env.appUrl);

  if (!configuredUrl) {
    fallbackUrl.searchParams.set('payos', result);
    return fallbackUrl.toString();
  }

  const redirectUrl = new URL(configuredUrl);

  if (redirectUrl.pathname.includes(':bookingId')) {
    redirectUrl.pathname = redirectUrl.pathname.replace(':bookingId', encodeURIComponent(bookingId));
  } else if (!redirectUrl.searchParams.has('bookingId')) {
    redirectUrl.searchParams.set('bookingId', bookingId);
  }

  redirectUrl.searchParams.set('payos', result);
  return redirectUrl.toString();
}

function mapPayosStatusToPaymentStatus(providerStatus) {
  if (providerStatus === 'PAID') {
    return 'paid';
  }

  if (['CANCELLED', 'EXPIRED', 'FAILED'].includes(providerStatus)) {
    return 'failed';
  }

  return 'waiting';
}

function getPayosProviderStatus(value) {
  return String(value || '').trim().toUpperCase() || 'PENDING';
}

function stripBookingInternals(booking) {
  if (!booking) {
    return booking;
  }

  const { _bookingDbId, _departureDbId, _userDbId, ...publicBooking } = booking;
  return publicBooking;
}

function stripPaymentInternals(payment) {
  if (!payment) {
    return payment;
  }

  const { _bookingDbId, _paymentDbId, _userDbId, ...publicPayment } = payment;
  return publicPayment;
}

export async function getPaymentDetail(userId, bookingId) {
  const booking = await findBookingByIdAndUserId(bookingId, userId, { includeInternal: true });

  if (!booking) {
    throw new ApiError(404, 'Không tìm thấy booking.');
  }

  return {
    booking: stripBookingInternals(booking),
    payment: await findPaymentByBookingId(booking._bookingDbId),
    tour: await findTourById(booking.tourId),
  };
}

export async function payForBooking(userId, payload) {
  const { bookingId } = payload;
  const paymentDraft = await withTransaction(async (connection) => {
    const booking = await findBookingByIdAndUserId(
      bookingId,
      userId,
      { includeInternal: true },
      connection,
    );

    if (!booking) {
      throw new ApiError(404, 'Không tìm thấy booking.');
    }

    if (booking.paymentStatus === 'paid') {
      throw new ApiError(400, 'Booking này đã được thanh toán.');
    }

    const currentPayment = await findPaymentByBookingId(booking._bookingDbId, connection, {
      includeInternal: true,
    });

    const paymentData = {
      amount: booking.totalPrice,
      bookingId: booking._bookingDbId,
      checkoutUrl: null,
      method: PAYOS_METHOD,
      provider: PAYOS_PROVIDER,
      providerOrderCode: currentPayment?.providerOrderCode || generatePayosOrderCode(),
      providerPaymentLinkId: null,
      providerStatus: 'PENDING',
      qrCode: null,
      status: 'waiting',
      userId,
    };

    const payment = currentPayment
      ? await updatePayment(
          currentPayment._paymentDbId,
          {
            amount: paymentData.amount,
            method: paymentData.method,
            provider: paymentData.provider,
            providerOrderCode: paymentData.providerOrderCode,
            providerStatus: paymentData.providerStatus,
            status: paymentData.status,
          },
          connection,
          { includeInternal: true },
        )
      : await createPayment(paymentData, connection, { includeInternal: true });

    const timeline = currentPayment
      ? booking.timeline
      : appendTimelineItem(
          booking.timeline,
          'Khởi tạo thanh toán PayOS',
          'Hệ thống đã tạo yêu cầu thanh toán PayOS cho booking này.',
        );

    const updatedBooking = await updateBooking(
      booking._bookingDbId,
      {
        paymentMethod: PAYOS_METHOD,
        paymentStatus: 'waiting',
        timeline,
      },
      connection,
    );

    return {
      booking: updatedBooking,
      payment,
      tour: await findTourById(updatedBooking.tourId, connection),
    };
  });

  if (paymentDraft.payment.checkoutUrl && paymentDraft.payment.qrCode) {
    return {
      ...paymentDraft,
      payment: stripPaymentInternals(paymentDraft.payment),
    };
  }

  const paymentLink = await createPayosPaymentLink({
    amount: Math.round(paymentDraft.booking.totalPrice),
    buyerEmail: paymentDraft.booking.customerEmail,
    buyerName: paymentDraft.booking.customerName,
    buyerPhone: paymentDraft.booking.customerPhone,
    cancelUrl: buildPayosRedirectUrl(env.payosCancelUrl, paymentDraft.booking.id, 'cancel'),
    description: `TT ${paymentDraft.booking.id}`,
    items: [
      {
        name: paymentDraft.tour?.title?.slice(0, 80) || `Booking ${paymentDraft.booking.id}`,
        price: Math.round(paymentDraft.booking.totalPrice),
        quantity: 1,
      },
    ],
    orderCode: paymentDraft.payment.providerOrderCode,
    returnUrl: buildPayosRedirectUrl(env.payosReturnUrl, paymentDraft.booking.id, 'return'),
  });

  const payment = await updatePayment(paymentDraft.payment._paymentDbId, {
    checkoutUrl: paymentLink.checkoutUrl,
    providerPaymentLinkId: paymentLink.paymentLinkId,
    providerStatus: getPayosProviderStatus(paymentLink.status),
    qrCode: paymentLink.qrCode,
  });

  return {
    ...paymentDraft,
    payment,
  };
}

async function applyPayosStatus(payment, providerStatus, amount, connection) {
  const paymentStatus = mapPayosStatusToPaymentStatus(providerStatus);
  const booking = await findBookingByDbId(payment._bookingDbId, { includeInternal: true }, connection);

  if (!booking) {
    throw new ApiError(404, 'Không tìm thấy booking liên quan tới thanh toán PayOS.');
  }

  if (paymentStatus === 'paid' && Number(amount) !== Number(payment.amount)) {
    throw new ApiError(400, 'Số tiền PayOS trả về không khớp với booking.');
  }

  if (payment.status === paymentStatus && payment.providerStatus === providerStatus) {
    return {
      booking: stripBookingInternals(booking),
      payment: stripPaymentInternals(payment),
    };
  }

  if (payment.status === 'paid' && booking.paymentStatus === 'paid') {
    return {
      booking: stripBookingInternals(booking),
      payment: stripPaymentInternals(payment),
    };
  }

  const updatedPayment = await updatePayment(
    payment._paymentDbId,
    {
      paidAt: paymentStatus === 'paid' && !payment.paidAt ? createSqlDateTime() : payment.paidAt,
      providerStatus,
      status: paymentStatus,
    },
    connection,
  );

  const timeline =
    paymentStatus === 'paid'
      ? appendTimelineItem(
          booking.timeline,
          'Thanh toán PayOS hoàn tất',
          'PayOS đã xác nhận giao dịch thành công và booking được chuyển sang trạng thái đã xác nhận.',
        )
      : appendTimelineItem(
          booking.timeline,
          'Thanh toán PayOS chưa hoàn tất',
          `PayOS trả về trạng thái ${providerStatus}.`,
        );

  const updatedBooking = await updateBooking(
    booking._bookingDbId,
    {
      paymentMethod: PAYOS_METHOD,
      paymentStatus: paymentStatus === 'paid' ? 'paid' : 'waiting',
      status: paymentStatus === 'paid' ? 'confirmed' : booking.status,
      timeline,
    },
    connection,
  );

  return {
    booking: updatedBooking,
    payment: updatedPayment,
  };
}

export async function handlePayosWebhook(payload) {
  const webhookData = await verifyPayosWebhook(payload);

  return withTransaction(async (connection) => {
    const payment = await findPaymentByProviderOrderCode(webhookData.orderCode, connection, {
      includeInternal: true,
    });

    if (!payment) {
      throw new ApiError(404, 'Không tìm thấy payment PayOS cần cập nhật.');
    }

    return applyPayosStatus(
      payment,
      getPayosProviderStatus(webhookData.code === '00' ? 'PAID' : 'FAILED'),
      webhookData.amount,
      connection,
    );
  });
}

export async function syncPayosPaymentStatus(userId, bookingId) {
  const booking = await findBookingByIdAndUserId(bookingId, userId, { includeInternal: true });

  if (!booking) {
    throw new ApiError(404, 'Không tìm thấy booking.');
  }

  const payment = await findPaymentByBookingId(booking._bookingDbId, null, {
    includeInternal: true,
  });

  if (!payment?.providerOrderCode) {
    return getPaymentDetail(userId, bookingId);
  }

  const payosPayment = await getPayosPaymentLink(payment.providerOrderCode);

  await withTransaction(async (connection) => {
    const currentPayment = await findPaymentByProviderOrderCode(payment.providerOrderCode, connection, {
      includeInternal: true,
    });

    if (!currentPayment) {
      throw new ApiError(404, 'Không tìm thấy payment PayOS cần đồng bộ.');
    }

    await applyPayosStatus(
      currentPayment,
      getPayosProviderStatus(payosPayment.status),
      payosPayment.amount,
      connection,
    );
  });

  return getPaymentDetail(userId, bookingId);
}
