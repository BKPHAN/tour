import { bookingHistory, getBookingById, getTourById, testimonials, tours } from '../data/mockData.js';

/**
 * Tạo độ trễ giả để frontend mô phỏng cảm giác đang gọi API thật.
 */
function wait(ms = 120) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

/**
 * Lấy danh sách tour nổi bật để hiển thị ở trang chủ.
 */
export async function getFeaturedTours() {
  await wait();
  return tours.slice(0, 3);
}

/**
 * Lấy toàn bộ danh sách tour từ nguồn dữ liệu mock.
 */
export async function getAllTours() {
  await wait();
  return tours;
}

/**
 * Lấy thông tin chi tiết của một tour theo id.
 */
export async function getTourDetail(tourId) {
  await wait();
  return getTourById(tourId);
}

/**
 * Lấy danh sách đánh giá mẫu để đổ vào landing page.
 */
export async function getTestimonials() {
  await wait();
  return testimonials;
}

/**
 * Lấy lịch sử booking mẫu của người dùng.
 */
export async function getBookings() {
  await wait();
  return bookingHistory;
}

/**
 * Lấy chi tiết một booking để dùng cho trang xem đơn và thanh toán.
 */
export async function getBookingDetail(bookingId) {
  await wait();
  return getBookingById(bookingId);
}
