# TourFlow

Website đặt tour du lịch với cấu trúc `client/server`, dùng chung `package.json`, `node_modules` và file `.env` tại thư mục `source`.

## Yêu cầu môi trường

- Node.js 18 trở lên
- npm 9 trở lên

## Cấu trúc thư mục

```text
source/
  .env
  .env.example
  package.json
  nodemon.json
  vite.config.js
  client/
    public/
    src/
      pages/
        admin/
        user/
    index.html
  server/
    app.js
    server.js
    migrations/
    src/
  dist/
```

- `client`: frontend React + Vite + Tailwind CSS
- `client/src/pages/user`: nhóm page giao diện người dùng
- `client/src/pages/admin`: nhóm page giao diện quản trị admin/staff
- `server`: backend Express + API người dùng + migrations SQL
- `.env`: file biến môi trường dùng chung cho cả frontend và backend
- `dist`: bản build frontend để backend serve ở môi trường production

## Cài đặt

```bash
cd C:\Users\Lenovo\Desktop\tour\source
npm install
```

## Chạy project ở môi trường phát triển

Project hiện được cấu hình để frontend và backend cùng chạy trên một địa chỉ:

- [http://localhost:4000](http://localhost:4000)

Chạy lệnh:

```bash
cd C:\Users\Lenovo\Desktop\tour\source
npm run dev
```

Giải thích:

- `npm run dev`: chạy Express + Vite middleware trên cùng port `4000`
- `npm run dev:server`: chạy riêng backend bằng `nodemon`
- `npm run dev:client`: chạy riêng frontend Vite trên `5173`

## Build và chạy production local

Build frontend:

```bash
cd C:\Users\Lenovo\Desktop\tour\source
npm run build
```

Sau đó chạy backend để serve luôn frontend build:

```bash
cd C:\Users\Lenovo\Desktop\tour\source
npm run start:server
```

Khi đó ứng dụng cũng truy cập tại:

- [http://localhost:4000](http://localhost:4000)

## Cấu hình `.env`

Project dùng chung:

- [`.env`](/C:/Users/Lenovo/Desktop/tour/source/.env)
- [`.env.example`](/C:/Users/Lenovo/Desktop/tour/source/.env.example)

Các nhóm biến chính:

```env
APP_NAME=TourFlow
APP_ENV=development

PORT=4000
VITE_APP_NAME=TourFlow
VITE_HERO_EFFECT=leaves
VITE_HERO_EFFECT_COUNT=18
VITE_HERO_EFFECT_SPEED=1
VITE_HERO_EFFECT_SCALE=1
VITE_HERO_EFFECT_OPACITY=0.72

DB_HOST=localhost
DB_PORT=3306
DB_NAME=tour_db
DB_USER=root
DB_PASSWORD=

JWT_SECRET=change_me_for_real_project
REFRESH_TOKEN_SECRET=change_me_for_real_project_refresh
ACCESS_TOKEN_EXPIRES_IN=7h
REFRESH_TOKEN_EXPIRES_IN=1d
```

Lưu ý:

- Biến bắt đầu bằng `VITE_` sẽ được frontend sử dụng
- `PORT` là cổng dùng chung, backend sẽ tự suy ra URL app là `http://localhost:${PORT}`
- API frontend và backend đang cố định cùng dùng tiền tố `/api` ngay trong code
- Access token hiện hết hạn sau `7h`, refresh token hết hạn sau `1d`
- Cần đổi `JWT_SECRET` khi triển khai môi trường thật

Hiệu ứng hero có thể đổi nhanh bằng env:

- `VITE_HERO_EFFECT=leaves`: lá rơi
- `VITE_HERO_EFFECT=particles`: hạt sáng bay
- `VITE_HERO_EFFECT=stars`: sao rơi
- `VITE_HERO_EFFECT=snow`: tuyết rơi
- `VITE_HERO_EFFECT=petals`: cánh hoa rơi
- `VITE_HERO_EFFECT=clouds`: mây trôi
- `VITE_HERO_EFFECT=birds`: chim bay
- `VITE_HERO_EFFECT=sparkles`: nắng lấp lánh
- `VITE_HERO_EFFECT=none`: tắt hiệu ứng

## Database và seed dữ liệu

Thư mục SQL hiện có tại:

- [server/migrations/001_create_tour_db.sql](/C:/Users/Lenovo/Desktop/tour/source/server/migrations/001_create_tour_db.sql)
- [server/migrations/002_data_seed.sql](/C:/Users/Lenovo/Desktop/tour/source/server/migrations/002_data_seed.sql)

Thứ tự chạy:

1. Tạo database và bảng bằng `001_create_tour_db.sql`
2. Seed dữ liệu mẫu bằng `002_data_seed.sql`

Database mẫu đang dùng tên:

- `tour_db`

## Tài khoản demo

Có sẵn tài khoản demo để kiểm tra nhanh các luồng chính:

- Người dùng frontend: `demo` / `123456`
- Admin portal mock: `admin` / `admin123`
- Staff portal mock: `staff` / `staff123`

## Tình trạng hiện tại

- Frontend người dùng đã có giao diện và đã nối với backend
- Thư mục page frontend đã được tách rõ thành `client/src/pages/user` và `client/src/pages/admin`
- Backend đang chạy bằng Express và đọc dữ liệu người dùng trực tiếp từ MySQL theo cấu hình trong `.env`
- Luồng chính đã có: đăng ký, đăng nhập, xem tour, xem chi tiết tour, đặt tour, thanh toán, lịch sử booking
- Portal admin hiện vẫn là frontend mock cho các màn đăng nhập admin, dashboard và quản lý người dùng; chưa nối backend thật

## Lệnh hay dùng

```bash
npm run dev
npm run dev:server
npm run dev:client
npm run build
npm run start:server
```

## Ghi chú

- Hãy chạy lệnh tại thư mục `source`
- Nếu port `4000` đang bận, cần dừng tiến trình cũ trước khi chạy lại
- Khi chạy development bằng `npm run dev`, backend là entry chính và Vite được mount vào Express
