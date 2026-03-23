import { mockDatabase } from '../config/mockDatabase.js';

/**
 * Lấy toàn bộ danh sách tour đang có trong bộ dữ liệu mock.
 */
export function findAllTours() {
  return mockDatabase.tours;
}

/**
 * Lấy một tour theo id.
 */
export function findTourById(tourId) {
  return mockDatabase.tours.find((tour) => tour.id === tourId) || null;
}

/**
 * Lấy tour nổi bật cho trang chủ.
 */
export function findFeaturedTours(limit = 3) {
  return mockDatabase.tours.slice(0, limit);
}

/**
 * Lấy danh sách testimonial cho landing page.
 */
export function findTestimonials() {
  return mockDatabase.testimonials;
}

/**
 * Tìm đợt khởi hành của một tour theo departure id.
 */
export function findDepartureById(tourId, departureId) {
  const tour = findTourById(tourId);

  if (!tour) {
    return null;
  }

  return tour.departures.find((departure) => departure.id === departureId) || null;
}

/**
 * Trừ số chỗ còn lại khi booking được tạo thành công.
 */
export function reserveDepartureSlots(tourId, departureId, travelerCount) {
  const departure = findDepartureById(tourId, departureId);

  if (!departure) {
    return null;
  }

  departure.slots -= travelerCount;
  return departure;
}

/**
 * Hoàn trả số chỗ khi booking bị hủy.
 */
export function releaseDepartureSlots(tourId, departureId, travelerCount) {
  const departure = findDepartureById(tourId, departureId);

  if (!departure) {
    return null;
  }

  departure.slots += travelerCount;
  return departure;
}
