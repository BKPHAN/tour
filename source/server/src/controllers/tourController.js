import { getFeaturedTours, getLandingTestimonials, getTourDetail, getTours } from '../services/tourService.js';
import { sendSuccess } from '../utils/apiResponse.js';

/**
 * Trả danh sách tour có hỗ trợ tìm kiếm và lọc.
 */
export function listTours(req, res, next) {
  try {
    const tours = getTours(req.query);
    return sendSuccess(res, tours, 'Lấy danh sách tour thành công.');
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
    return sendSuccess(res, tours, 'Lấy tour nổi bật thành công.');
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
    return sendSuccess(res, tour, 'Lấy chi tiết tour thành công.');
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
    return sendSuccess(res, testimonials, 'Lấy testimonial thành công.');
  } catch (error) {
    return next(error);
  }
}
