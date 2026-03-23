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
  client/
    public/
    src/
    index.html
    vite.config.js
  server/
    app.js
    server.js
    migrations/
    src/
  dist/
```

- `client`: frontend React + Vite + Tailwind CSS
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

Có sẵn tài khoản demo để kiểm tra luồng đăng nhập:

- Tên đăng nhập: `demo`
- Mật khẩu: `123456`

## Tình trạng hiện tại

- Frontend người dùng đã có giao diện và đã nối với backend
- Backend đang chạy bằng Express với dữ liệu mock in-memory và đã có migrations SQL để chuẩn bị chuyển sang MySQL thật
- Luồng chính đã có: đăng ký, đăng nhập, xem tour, xem chi tiết tour, đặt tour, thanh toán, lịch sử booking

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
