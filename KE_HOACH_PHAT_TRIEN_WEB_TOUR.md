# Kế Hoạch Phát Triển Website Đặt Tour Du Lịch

## 1. Mục tiêu dự án

Dựa trên tài liệu trong thư mục `tailieu`, website cần có 2 giai đoạn phát triển:

1. Giai đoạn 1: Xây dựng phần dành cho người dùng.
2. Giai đoạn 2: Xây dựng phần dành cho quản lý.

Mục tiêu là làm theo hướng đơn giản, dễ hiểu, phù hợp với người mới học lập trình.

## 2. Công nghệ sử dụng

- Frontend: ReactJS
- Backend: Node.js + ExpressJS
- Database: MySQL
- Gọi API từ frontend: Axios
- Điều hướng trang: React Router DOM
- Mã hóa mật khẩu: bcrypt
- Xác thực đăng nhập: JWT
- Kết nối MySQL: mysql2

## 3. Định hướng làm dự án cho người mới

Để code dễ đọc và dễ hiểu, dự án nên đi theo các nguyên tắc sau:

- Không dùng kiến trúc quá phức tạp.
- Không chia quá nhiều tầng khó theo dõi.
- Tên file, tên hàm, tên biến phải rõ nghĩa.
- Mỗi hàm đều có comment mô tả nhiệm vụ.
- Mỗi đoạn logic quan trọng đều có comment giải thích.
- Mỗi API chỉ xử lý một nhiệm vụ chính.
- Frontend chia theo `pages`, `components`, `services`.
- Backend chia theo `routes`, `controllers`, `models`, `middlewares`, `config`.

### 3.1. Quy định về convention

Để toàn bộ dự án thống nhất và dễ đọc, cần dùng convention cố định ngay từ đầu.

#### Convention đặt tên file

- File React component và page dùng `PascalCase`.
- File service, utility, middleware, controller, model dùng `camelCase`.
- File route đặt theo dạng `tenNhomRoutes.js`.

Ví dụ:

- `LoginPage.jsx`
- `TourDetailPage.jsx`
- `authService.js`
- `tourController.js`
- `bookingModel.js`
- `authRoutes.js`

#### Convention đặt tên biến, hàm, component

- Biến dùng `camelCase`.
- Hàm dùng `camelCase`.
- Component React dùng `PascalCase`.
- Hằng số cố định có thể dùng `UPPER_SNAKE_CASE`.

Ví dụ:

- `userInfo`
- `tourList`
- `handleLogin`
- `createBooking`
- `TourCard`
- `DEFAULT_PAGE_SIZE`

#### Convention đặt tên database

- Tên bảng dùng chữ thường và dạng số nhiều.
- Tên cột dùng `snake_case`.
- Tên khóa ngoại đặt theo tên cột thật như `user_id`, `tour_id`, `booking_id`.

Ví dụ:

- `users`
- `tour_departures`
- `created_at`
- `delete_flg`

#### Convention viết API

- URL API dùng chữ thường.
- Tên API theo danh từ rõ nghĩa.
- Dùng đúng method như `GET`, `POST`, `PUT`, `DELETE`.
- Response JSON nên có cấu trúc thống nhất.

Ví dụ response:

```json
{
  "success": true,
  "message": "Lấy danh sách tour thành công",
  "data": []
}
```

Ví dụ error response:

```json
{
  "success": false,
  "message": "Tour không tồn tại"
}
```

#### Convention viết comment

- Mỗi hàm cần có comment mô tả nhiệm vụ.
- Mỗi đoạn xử lý quan trọng cần có comment ngắn giải thích logic.
- Comment viết ngắn, dễ hiểu, đúng vào mục đích của đoạn code.

#### Convention viết code

- Một hàm chỉ nên làm một nhiệm vụ chính.
- Không viết hàm quá dài nếu có thể tách nhỏ.
- Không viết nhiều logic SQL, xử lý request và validate trong cùng một chỗ.
- Controller chỉ nên nhận request và trả response.
- Model chỉ nên xử lý truy vấn database.
- Service chỉ nên xử lý nghiệp vụ nếu logic dài hoặc phức tạp hơn.

#### Convention format

- Thống nhất dùng dấu cách, xuống dòng rõ ràng.
- Mỗi khối `if`, `for`, `function` phải có ngoặc nhọn đầy đủ.
- Tên biến phải rõ nghĩa, không viết tắt khó hiểu.
- Không đặt tên chung chung như `data1`, `abc`, `test`.

## 4. Phạm vi chức năng lấy từ tài liệu

### Phần người dùng

- Đăng ký
- Đăng nhập
- Đăng xuất
- Quên mật khẩu
- Đặt lại mật khẩu
- Xem danh sách tour
- Tìm kiếm tour
- Lọc tour
- Xem chi tiết tour
- Xem lịch trình tour
- Xem lịch khởi hành
- Đặt tour
- Thanh toán
- Xem lịch sử đặt tour
- Xem chi tiết đơn đặt tour
- Hủy tour

### Phần quản lý

- Quản lý người dùng
- Quản lý tour
- Quản lý lịch khởi hành và số chỗ
- Quản lý booking
- Quản lý thanh toán

## 5. Cấu trúc thư mục đề xuất

## 5.1. Frontend ReactJS

```text
frontend/
  src/
    components/
    pages/
    services/
    utils/
    layouts/
    routes/
    App.js
    main.js
```

Giải thích:

- `components`: chứa các khối giao diện dùng lại nhiều lần.
- `pages`: chứa từng trang lớn như trang đăng nhập, trang danh sách tour.
- `services`: chứa code gọi API.
- `utils`: chứa hàm dùng chung.
- `layouts`: chứa bố cục trang người dùng và quản lý.
- `routes`: chứa khai báo đường dẫn trang.

## 5.2. Backend Node.js

```text
backend/
  src/
    config/
    controllers/
    middlewares/
    models/
    routes/
    services/
    utils/
    app.js
    server.js
```

Giải thích:

- `config`: cấu hình database, JWT, biến môi trường.
- `controllers`: nhận request, xử lý dữ liệu đầu vào, trả response.
- `models`: viết câu lệnh SQL làm việc với MySQL.
- `routes`: khai báo các API endpoint.
- `middlewares`: xác thực token, kiểm tra quyền admin.
- `services`: xử lý nghiệp vụ tách riêng nếu logic dài.
- `utils`: các hàm hỗ trợ dùng lại.

## 6. Database sử dụng

Theo tài liệu, các bảng chính gồm:

- `users`
- `tours`
- `tour_itineraries`
- `tour_departures`
- `bookings`
- `payments`
- `reviews`

Các bảng này đã đủ để làm cả phần người dùng và phần quản lý.

## 7. Giai đoạn 1: Làm phần người dùng trước

## 7.1. Mục tiêu của giai đoạn 1

Hoàn thành luồng cơ bản để một người dùng có thể:

- Tạo tài khoản
- Đăng nhập
- Xem tour
- Xem chi tiết tour
- Chọn lịch khởi hành
- Đặt tour
- Thanh toán
- Xem lịch sử đặt tour
- Hủy booking khi cần

## 7.2. Giai đoạn con 1 của giai đoạn 1: Làm frontend cho người dùng trước

Mục tiêu của giai đoạn con này là dựng giao diện trước để nhìn rõ luồng sử dụng của người dùng. Ở bước này có thể dùng dữ liệu giả (`mock data`) hoặc dữ liệu tạm viết cứng trong ReactJS, chưa cần gọi database ngay.

### Các trang frontend cần làm

- Trang chủ
- Trang danh sách tour
- Trang chi tiết tour
- Trang đăng ký
- Trang đăng nhập
- Trang quên mật khẩu
- Trang đặt tour
- Trang thanh toán
- Trang lịch sử booking
- Trang chi tiết booking

### Việc cần làm ở frontend

- Tạo layout chung cho phần người dùng
- Tạo menu, header, footer
- Tạo các trang và chia component rõ ràng
- Tạo route điều hướng giữa các trang
- Dùng dữ liệu mẫu để hiển thị giao diện trước
- Hoàn thiện form nhập liệu cho đăng ký, đăng nhập, booking, thanh toán

### Kết quả cần đạt sau giai đoạn con frontend

- Người xem có thể bấm qua đầy đủ các trang
- Giao diện đã thể hiện được luồng sử dụng thật
- Form và bảng dữ liệu đã có bố cục rõ ràng
- Sẵn sàng nối API ở bước backend sau đó

## 7.3. Giai đoạn con 2 của giai đoạn 1: Làm backend cho người dùng và truy vấn database

Sau khi frontend đã xong khung giao diện, mới bắt đầu viết backend để kết nối MySQL, xử lý nghiệp vụ và trả dữ liệu thật cho frontend.

### Các API backend cần làm

### Nhóm xác thực

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `POST /api/auth/forgot-password`
- `POST /api/auth/reset-password`

### Nhóm tour

- `GET /api/tours`
- `GET /api/tours/search?q=`
- `GET /api/tours/filter?destination=&priceMin=&priceMax=&duration=`
- `GET /api/tours/:id`
- `GET /api/tours/:id/schedule`
- `GET /api/tours/:id/departures`

### Nhóm booking và payment

- `POST /api/bookings`
- `POST /api/payments`
- `GET /api/payments/:bookingId`
- `GET /api/bookings/my`
- `GET /api/bookings/:id`
- `DELETE /api/bookings/:id`

### Các bảng database dùng trong giai đoạn 1

- `users`
- `tours`
- `tour_itineraries`
- `tour_departures`
- `bookings`
- `payments`
- `reviews` có thể làm sau, không bắt buộc ngay ở bản đầu

### Việc cần làm ở backend

- Tạo project backend và cấu trúc thư mục rõ ràng
- Kết nối MySQL
- Tạo route, controller, model cho từng nhóm chức năng
- Viết truy vấn SQL đơn giản, dễ đọc
- Kiểm tra dữ liệu đầu vào
- Xử lý JWT để xác thực người dùng
- Trả dữ liệu JSON để frontend gọi và hiển thị

## 7.4. Thứ tự làm giai đoạn 1

### Bước 1: Khởi tạo project frontend và backend

- Tạo thư mục `frontend`
- Tạo thư mục `backend`
- Cài ReactJS cho frontend
- Cài ExpressJS cho backend
- Chuẩn bị cấu trúc thư mục đơn giản, dễ học

### Bước 2: Làm frontend người dùng trước

- Tạo giao diện các trang người dùng
- Tạo route giữa các trang
- Tạo form đăng ký, đăng nhập, đặt tour, thanh toán
- Dùng dữ liệu giả để hoàn thiện giao diện và kiểm tra luồng

### Bước 3: Tạo database

- Chạy file tạo bảng từ tài liệu `database.docx`
- Chạy file dữ liệu mẫu từ tài liệu `seed_data.docx`
- Kiểm tra dữ liệu bằng MySQL Workbench hoặc phpMyAdmin

### Bước 4: Làm backend đăng ký và đăng nhập

- Backend kiểm tra dữ liệu đầu vào
- Mã hóa mật khẩu bằng bcrypt
- Tạo token bằng JWT sau khi đăng nhập thành công
- Kết nối form frontend với API thật

### Bước 5: Làm backend xem tour

- Lấy danh sách tour từ database
- Tìm kiếm tour theo từ khóa
- Lọc tour theo điểm đến, giá, số ngày
- Lấy chi tiết tour
- Lấy lịch trình và lịch khởi hành

### Bước 6: Làm backend đặt tour và thanh toán

- Người dùng chọn lịch khởi hành
- Nhập số lượng người đi
- Tạo booking
- Tính tổng tiền
- Cập nhật số chỗ đã đặt
- Tạo bản ghi thanh toán
- Cập nhật trạng thái thanh toán
- Hiển thị thông tin thanh toán cho booking

### Bước 7: Làm backend lịch sử đặt tour

- Hiển thị danh sách booking của người dùng
- Xem chi tiết từng booking
- Hủy booking nếu trạng thái cho phép

## 7.5. Kết quả cần đạt sau giai đoạn 1

Sau giai đoạn này, website phải chạy được luồng hoàn chỉnh sau:

1. Người dùng đăng ký tài khoản.
2. Người dùng đăng nhập.
3. Người dùng xem danh sách tour.
4. Người dùng xem chi tiết tour và lịch khởi hành.
5. Người dùng đặt tour.
6. Người dùng thanh toán.
7. Người dùng xem lịch sử booking của mình.

## 8. Giai đoạn 2: Làm phần quản lý sau

## 8.1. Mục tiêu của giai đoạn 2

Xây dựng trang quản lý để admin có thể:

- Quản lý người dùng
- Quản lý tour
- Quản lý lịch khởi hành
- Quản lý booking
- Quản lý thanh toán

## 8.2. Giai đoạn con 1 của giai đoạn 2: Làm frontend cho quản lý trước

Mục tiêu của giai đoạn con này là dựng trước giao diện quản trị để thấy rõ admin sẽ thao tác ở đâu, quản lý dữ liệu thế nào. Giai đoạn này cũng có thể dùng dữ liệu giả trước.

### Các trang frontend quản lý cần làm

- Trang đăng nhập quản trị
- Trang dashboard quản lý
- Trang danh sách người dùng
- Trang chi tiết người dùng
- Trang danh sách tour
- Trang thêm tour
- Trang sửa tour
- Trang danh sách booking
- Trang chi tiết booking
- Trang danh sách thanh toán
- Trang chi tiết thanh toán

### Việc cần làm ở frontend quản lý

- Tạo layout riêng cho admin
- Tạo menu trái hoặc menu đầu trang cho admin
- Tạo bảng danh sách dữ liệu
- Tạo form thêm, sửa, xem chi tiết
- Tạo giao diện dashboard đơn giản
- Dùng dữ liệu giả để kiểm tra luồng thao tác

### Kết quả cần đạt sau giai đoạn con frontend

- Admin có thể đi qua toàn bộ các trang quản lý
- Giao diện quản trị đã rõ luồng danh sách, chi tiết, thêm, sửa
- Sẵn sàng nối API quản trị ở bước backend tiếp theo

## 8.3. Giai đoạn con 2 của giai đoạn 2: Làm backend cho quản lý và truy vấn database

Sau khi frontend quản lý đã rõ cấu trúc, bắt đầu viết backend để lấy dữ liệu thật, cập nhật dữ liệu và phân quyền admin.

### Các API backend quản lý cần làm

### Quản lý người dùng

- `GET /api/admin/users`
- `GET /api/admin/users/:id`
- `PUT /api/admin/users/:id`
- `DELETE /api/admin/users/:id`

### Quản lý tour

- `GET /api/admin/tours`
- `POST /api/admin/tours`
- `PUT /api/admin/tours/:id`
- `DELETE /api/admin/tours/:id`

### Quản lý booking

- `GET /api/admin/bookings`
- `GET /api/admin/bookings/:id`
- `PUT /api/admin/bookings/:id/status`
- `DELETE /api/admin/bookings/:id`

### Quản lý thanh toán

- `GET /api/admin/payments`
- `GET /api/admin/payments/:id`
- `PUT /api/admin/payments/:id/status`
- `POST /api/admin/payments/refund/:id`

### Việc cần làm ở backend quản lý

- Tạo middleware kiểm tra đăng nhập admin
- Tạo API danh sách, chi tiết, thêm, sửa, xóa mềm
- Viết truy vấn SQL cho phần quản trị
- Kết nối frontend quản lý với API thật
- Kiểm tra quyền trước khi cho phép cập nhật dữ liệu

## 8.4. Thứ tự làm giai đoạn 2

### Bước 1: Làm frontend quản lý trước

- Tạo trang đăng nhập quản trị
- Tạo dashboard
- Tạo giao diện danh sách, chi tiết, thêm, sửa
- Dùng dữ liệu giả để hoàn thiện giao diện quản trị

### Bước 2: Tạo middleware phân quyền admin

- Kiểm tra token
- Kiểm tra `role = admin`
- Chặn người dùng thường truy cập trang quản lý

### Bước 3: Làm backend quản lý người dùng

- Xem danh sách người dùng
- Xem chi tiết người dùng
- Cập nhật trạng thái tài khoản
- Xóa mềm người dùng bằng `delete_flg`

### Bước 4: Làm backend quản lý tour

- Thêm tour mới
- Sửa tour
- Xóa mềm tour
- Quản lý lịch trình
- Quản lý lịch khởi hành
- Quản lý số chỗ còn lại

### Bước 5: Làm backend quản lý booking

- Xem danh sách booking
- Xem chi tiết booking
- Cập nhật trạng thái booking
- Hủy hoặc xóa mềm booking

### Bước 6: Làm backend quản lý thanh toán

- Xem danh sách thanh toán
- Xem chi tiết thanh toán
- Cập nhật trạng thái thanh toán
- Hoàn tiền nếu cần

## 8.5. Kết quả cần đạt sau giai đoạn 2

Sau giai đoạn này, admin phải có thể quản lý toàn bộ dữ liệu chính của hệ thống từ giao diện web.

## 9. Luồng phát triển đề xuất theo tuần

### Tuần 1

- Khởi tạo frontend và backend
- Tạo cấu trúc thư mục đơn giản, dễ hiểu
- Làm frontend phần người dùng
- Tạo layout, header, footer, menu cho người dùng
- Tạo các trang đăng ký, đăng nhập, danh sách tour, chi tiết tour
- Tạo các trang đặt tour, thanh toán, lịch sử booking
- Tạo route giữa các trang người dùng
- Dùng dữ liệu giả để kiểm tra luồng giao diện người dùng

### Tuần 2

- Hoàn thiện frontend phần người dùng
- Tạo database MySQL từ tài liệu
- Kết nối backend với MySQL
- Làm backend phần người dùng
- Làm API đăng ký, đăng nhập
- Làm API danh sách tour, tìm kiếm tour, lọc tour, chi tiết tour
- Làm API đặt tour, thanh toán, lịch sử booking
- Nối frontend người dùng với backend thật

### Tuần 3

- Kiểm tra và hoàn thiện toàn bộ phần người dùng
- Sửa lỗi giao diện và lỗi API phần người dùng
- Bắt đầu làm frontend phần quản lý
- Tạo layout riêng cho admin
- Tạo dashboard quản lý
- Tạo giao diện danh sách người dùng, tour, booking, payment
- Tạo giao diện thêm, sửa, xem chi tiết cho phần quản lý
- Dùng dữ liệu giả để kiểm tra luồng quản trị

### Tuần 4

- Hoàn thiện frontend phần quản lý
- Làm backend phần quản lý
- Làm middleware admin
- Làm API quản lý người dùng
- Làm API quản lý tour
- Làm API quản lý booking
- Làm API quản lý thanh toán
- Nối frontend quản lý với backend thật
- Kiểm tra toàn bộ hệ thống
- Sửa lỗi
- Hoàn thiện giao diện và comment code

## 10. Quy ước viết code dễ hiểu cho người mới

Đây là quy ước rất quan trọng vì mục tiêu của dự án không chỉ là chạy được, mà còn phải dễ đọc.

### 10.1. Quy ước trong backend

- Mỗi file route chỉ khai báo route.
- Mỗi controller chỉ xử lý request và response.
- Mỗi model chỉ viết truy vấn SQL.
- Nếu logic dài, tách sang service.
- Không viết quá nhiều logic dồn vào một file.

### 10.2. Quy ước trong frontend

- Mỗi trang là một file riêng.
- Phần gọi API để trong `services`.
- Component nào dùng lại nhiều lần thì mới tách riêng.
- State đặt tên rõ ràng như `tourList`, `bookingDetail`, `isLoading`.

### 10.3. Quy ước comment

Mỗi hàm cần có comment kiểu như sau:

```js
/**
 * Hàm này dùng để lấy danh sách tour từ database
 * Không nhận tham số
 * Trả về mảng tour
 */
async function getAllTours() {
  // Viết code ở đây
}
```

Mỗi đoạn logic quan trọng nên có comment giải thích:

```js
// Kiểm tra người dùng đã đăng nhập hay chưa
if (!user) {
  return res.status(401).json({ message: "Bạn chưa đăng nhập" });
}

// Tính tổng tiền dựa vào giá tour và số lượng người đặt
const totalAmount = price * quantity;
```

### 10.4. Quy tắc đặt tên

- Tên biến phải rõ nghĩa
- Không đặt tên quá ngắn như `a`, `b`, `x1`
- Dùng tiếng Anh đơn giản và nhất quán

Ví dụ:

- `userInfo`
- `tourDetail`
- `bookingHistory`
- `paymentStatus`
- `departureDate`

## 11. Cách triển khai code đơn giản được đề xuất

Để phù hợp với người mới, nên chọn cách làm sau:

- Backend dùng ExpressJS thuần
- Database dùng `mysql2` và viết SQL rõ ràng
- Không dùng ORM ở giai đoạn đầu
- Frontend dùng ReactJS cơ bản với `useState` và `useEffect`
- Chưa cần dùng Redux ở phiên bản đầu
- Chưa cần chia microservice hoặc kiến trúc phức tạp

Lý do:

- Dễ đọc luồng dữ liệu
- Dễ debug
- Dễ học cách frontend gọi backend
- Dễ học cách backend thao tác với MySQL

## 12. Kế hoạch file cần có khi bắt đầu code

### Frontend

- `src/pages/LoginPage.jsx`
- `src/pages/RegisterPage.jsx`
- `src/pages/TourListPage.jsx`
- `src/pages/TourDetailPage.jsx`
- `src/pages/BookingPage.jsx`
- `src/pages/PaymentPage.jsx`
- `src/pages/MyBookingsPage.jsx`
- `src/services/authService.js`
- `src/services/tourService.js`
- `src/services/bookingService.js`
- `src/services/paymentService.js`

### Backend

- `src/routes/authRoutes.js`
- `src/routes/tourRoutes.js`
- `src/routes/bookingRoutes.js`
- `src/routes/paymentRoutes.js`
- `src/routes/adminRoutes.js`
- `src/controllers/authController.js`
- `src/controllers/tourController.js`
- `src/controllers/bookingController.js`
- `src/controllers/paymentController.js`
- `src/models/userModel.js`
- `src/models/tourModel.js`
- `src/models/bookingModel.js`
- `src/models/paymentModel.js`
- `src/middlewares/authMiddleware.js`
- `src/middlewares/adminMiddleware.js`
- `src/config/db.js`

## 13. Kết luận

Hướng làm phù hợp nhất cho dự án này là:

1. Mỗi giai đoạn lớn đều làm frontend trước để nhìn rõ giao diện và luồng.
2. Sau khi frontend ổn định mới làm backend để truy vấn database.
3. Hoàn thành phần người dùng trước rồi mới chuyển sang phần quản lý.
4. Giữ cấu trúc code đơn giản để dễ học và dễ sửa.
5. Ghi comment cho từng hàm và từng đoạn logic quan trọng.
6. Mỗi giai đoạn lớn và mỗi giai đoạn con cần có một branch Git riêng để dễ quản lý.
7. Branch của giai đoạn sau phải được tạo từ branch của giai đoạn con ngay trước đó để giữ đúng luồng triển khai.

Ví dụ luồng branch có thể làm như sau:

- `main`
- `phase-1-user-frontend` tạo từ `main`
- `phase-1-user-backend` tạo từ `phase-1-user-frontend`
- `phase-2-admin-frontend` tạo từ `phase-1-user-backend`
- `phase-2-admin-backend` tạo từ `phase-2-admin-frontend`

Nếu làm đúng theo kế hoạch này, bạn sẽ dễ kiểm soát tiến độ hơn và không bị rối khi mới học ReactJS, Node.js và MySQL.
