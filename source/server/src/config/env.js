import path from 'node:path';
import dotenv from 'dotenv';

dotenv.config({
  path: path.resolve(process.cwd(), '.env'),
});

/**
 * Chuẩn hóa các biến môi trường để phần backend dùng chung một nguồn cấu hình.
 */
export const env = {
  apiPrefix: process.env.API_PREFIX || '/api',
  appEnv: process.env.APP_ENV || 'development',
  appName: process.env.APP_NAME || 'TourFlow',
  backendPort: Number(process.env.BACKEND_PORT || 3000),
  backendUrl: process.env.BACKEND_URL || 'http://localhost:3000',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d',
  jwtSecret: process.env.JWT_SECRET || 'change_me_for_real_project',
};
