import { PayOS } from '@payos/node';
import { env } from '../config/env.js';
import { ApiError } from '../utils/apiError.js';

let payosClient = null;

function ensurePayosConfig() {
  const missingKeys = [];

  if (!env.payosClientId) {
    missingKeys.push('PAYOS_CLIENT_ID');
  }

  if (!env.payosApiKey) {
    missingKeys.push('PAYOS_API_KEY');
  }

  if (!env.payosChecksumKey) {
    missingKeys.push('PAYOS_CHECKSUM_KEY');
  }

  if (missingKeys.length) {
    throw new ApiError(500, `Thiếu cấu hình PayOS: ${missingKeys.join(', ')}.`);
  }
}

function getPayosClient() {
  ensurePayosConfig();

  if (!payosClient) {
    payosClient = new PayOS({
      apiKey: env.payosApiKey,
      checksumKey: env.payosChecksumKey,
      clientId: env.payosClientId,
    });
  }

  return payosClient;
}

export async function createPayosPaymentLink(paymentData) {
  return getPayosClient().paymentRequests.create(paymentData);
}

export async function getPayosPaymentLink(orderCodeOrPaymentLinkId) {
  return getPayosClient().paymentRequests.get(orderCodeOrPaymentLinkId);
}

export async function verifyPayosWebhook(payload) {
  return getPayosClient().webhooks.verify(payload);
}
