import path from 'node:path';
import dotenv from 'dotenv';

dotenv.config({
  path: path.resolve(process.cwd(), '.env'),
});

const port = Number(process.env.PORT || 3000);
const appUrl = `http://localhost:${port}`;

/**
 * Chuẩn hóa các biến môi trường để phần backend dùng chung một nguồn cấu hình.
 */
export const env = {
  accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || '7h',
  appEnv: process.env.APP_ENV || 'development',
  appName: process.env.APP_NAME || 'TourFlow',
  appPort: port,
  appUrl,
  dbHost: process.env.DB_HOST || 'localhost',
  dbName: process.env.DB_NAME || 'tour_db',
  dbPassword: process.env.DB_PASSWORD || '',
  dbPort: Number(process.env.DB_PORT || 3306),
  dbUser: process.env.DB_USER || 'root',
  jwtSecret: process.env.JWT_SECRET || 'change_me_for_real_project',
  refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || '1d',
  refreshTokenSecret:
    process.env.REFRESH_TOKEN_SECRET || 'change_me_for_real_project_refresh',
};
