/**
 * Middleware xử lý các route không tồn tại.
 */
export function notFoundHandler(req, res) {
  return res.status(404).json({
    success: false,
    message: `Khong tim thay route ${req.originalUrl}`,
  });
}
