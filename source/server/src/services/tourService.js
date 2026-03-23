import {
  findAllTours,
  findFeaturedTours,
  findTestimonials,
  findTourById,
} from '../models/tourModel.js';
import { ApiError } from '../utils/apiError.js';

/**
 * Rút số ngày từ chuỗi duration để hỗ trợ lọc theo số ngày.
 */
function getDurationDays(duration) {
  const match = String(duration).match(/\d+/);
  return match ? Number(match[0]) : 0;
}

/**
 * Lấy danh sách tour có hỗ trợ lọc theo từ khóa, category, location, giá và số ngày.
 */
export function getTours(filters) {
  const {
    category,
    keyword,
    location,
    maxDays,
    maxPrice,
    minDays,
    minPrice,
  } = filters;

  return findAllTours().filter((tour) => {
    const normalizedKeyword = String(keyword || '').toLowerCase();
    const normalizedLocation = String(location || '').toLowerCase();
    const durationDays = getDurationDays(tour.duration);

    const matchesKeyword =
      !normalizedKeyword ||
      tour.title.toLowerCase().includes(normalizedKeyword) ||
      tour.location.toLowerCase().includes(normalizedKeyword) ||
      tour.description.toLowerCase().includes(normalizedKeyword);
    const matchesCategory = !category || category === 'all' || tour.category === category;
    const matchesLocation =
      !normalizedLocation || tour.location.toLowerCase().includes(normalizedLocation);
    const matchesMinPrice = !minPrice || tour.price >= Number(minPrice);
    const matchesMaxPrice = !maxPrice || tour.price <= Number(maxPrice);
    const matchesMinDays = !minDays || durationDays >= Number(minDays);
    const matchesMaxDays = !maxDays || durationDays <= Number(maxDays);

    return (
      matchesKeyword &&
      matchesCategory &&
      matchesLocation &&
      matchesMinPrice &&
      matchesMaxPrice &&
      matchesMinDays &&
      matchesMaxDays
    );
  });
}

/**
 * Lấy danh sách tour nổi bật phục vụ landing page.
 */
export function getFeaturedTours(limit) {
  return findFeaturedTours(limit ? Number(limit) : 3);
}

/**
 * Lấy testimonial cho trang chủ.
 */
export function getLandingTestimonials() {
  return findTestimonials();
}

/**
 * Lấy chi tiết một tour theo id.
 */
export function getTourDetail(tourId) {
  const tour = findTourById(tourId);

  if (!tour) {
    throw new ApiError(404, 'Không tìm thấy tour.');
  }

  return tour;
}
