import { getFeaturedTours, getLandingTestimonials, getTourDetail, getTours } from '../services/tourService.js';
import { sendSuccess } from '../utils/apiResponse.js';

/**
 * Trả danh sách tour có hỗ trợ tìm kiếm và lọc.
 */
export function listTours(req, res, next) {
  try {
    const tours = getTours(req.query);
    return sendSuccess(res, tours, 'Lay danh sach tour thanh cong.');
  } catch (error) {
    return next(error);
  }
}

/**
 * Trả danh sách tour nổi bật cho trang chủ.
 */
export function listFeaturedTours(req, res, next) {
  try {
    const tours = getFeaturedTours(req.query.limit);
    return sendSuccess(res, tours, 'Lay tour noi bat thanh cong.');
  } catch (error) {
    return next(error);
  }
}

/**
 * Trả chi tiết một tour theo id.
 */
export function getTour(req, res, next) {
  try {
    const tour = getTourDetail(req.params.tourId);
    return sendSuccess(res, tour, 'Lay chi tiet tour thanh cong.');
  } catch (error) {
    return next(error);
  }
}

/**
 * Trả testimonial cho landing page.
 */
export function listTestimonials(req, res, next) {
  try {
    const testimonials = getLandingTestimonials();
    return sendSuccess(res, testimonials, 'Lay testimonial thanh cong.');
  } catch (error) {
    return next(error);
  }
}
