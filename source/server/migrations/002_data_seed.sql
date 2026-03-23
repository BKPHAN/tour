-- ==================================================
-- 002_data_seed.sql
-- Du lieu mau cho giai doan 1 phan nguoi dung
-- Chay sau file 001_create_tour_db.sql
-- ==================================================

USE tour_db;

-- Users
INSERT INTO users (
  id, full_name, username, email, phone, password_hash, role, status, created_at, updated_at
) VALUES
  (
    1,
    'Nguyen Demo',
    'demo',
    'demo@tourflow.local',
    '0900000000',
    '$2b$10$cuf3hTtRXx7ALPTzgbKr2ORzWokA2VOq7Zy1a877mke/2DGOXkr9S',
    'user',
    'active',
    '2026-03-23 09:00:00',
    '2026-03-23 09:00:00'
  ),
  (
    2,
    'Tran Thu Ha',
    'hatran',
    'ha@example.com',
    '0908123456',
    '$2b$10$cuf3hTtRXx7ALPTzgbKr2ORzWokA2VOq7Zy1a877mke/2DGOXkr9S',
    'user',
    'active',
    '2026-03-20 08:30:00',
    '2026-03-20 08:30:00'
  );

-- Tours
INSERT INTO tours (
  id, slug, title, location, departure_point, category, duration_days, duration_label,
  price, rating, review_count, image_url, description, highlights_json, inclusions_json,
  status, created_at, updated_at
) VALUES
  (
    1,
    'sa-pa-mua-may',
    'Sa Pa Mua May',
    'Lao Cai',
    'Ha Noi',
    'Nui rung',
    3,
    '3 ngay 2 dem',
    4290000,
    4.9,
    148,
    'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80',
    'Hanh trinh san may, tham ban Cat Cat va nghi duong trong khong khi lanh cua Tay Bac.',
    JSON_ARRAY('Fansipan Legend', 'Ban Cat Cat', 'San may o Ham Rong'),
    JSON_ARRAY('Xe du lich 2 chieu', 'Khach san 3 sao', '3 bua chinh', 'Huong dan vien'),
    'published',
    '2026-03-01 09:00:00',
    '2026-03-01 09:00:00'
  ),
  (
    2,
    'da-nang-hoi-an-ruc-nang',
    'Da Nang - Hoi An Ruc Nang',
    'Mien Trung',
    'TP. HCM',
    'Bien pho',
    4,
    '4 ngay 3 dem',
    5890000,
    4.8,
    203,
    'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1200&q=80',
    'Combo tham quan bien My Khe, cau Rong, pho co Hoi An va buffet hai san ve dem.',
    JSON_ARRAY('Bien My Khe', 'Ba Na Hills', 'Pho co Hoi An'),
    JSON_ARRAY('Ve may bay khu hoi', 'Khach san 4 sao', 'Buffet hai san', 'Ve tham quan'),
    'published',
    '2026-03-01 09:10:00',
    '2026-03-01 09:10:00'
  ),
  (
    3,
    'phu-quoc-sunset-escape',
    'Phu Quoc Sunset Escape',
    'Kien Giang',
    'Can Tho',
    'Nghi duong',
    3,
    '3 ngay 2 dem',
    6790000,
    4.9,
    187,
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    'Trai nghiem cano 4 dao, ngam san ho, Sunset Town va dem nhac tren bai bien.',
    JSON_ARRAY('Cano 4 dao', 'Sunset Town', 'Cho dem Duong Dong'),
    JSON_ARRAY('Resort 4 sao', 'An sang buffet', 'Tour cano', 'Xe dua don'),
    'published',
    '2026-03-01 09:20:00',
    '2026-03-01 09:20:00'
  ),
  (
    4,
    'ha-giang-loop-ban-do-xanh',
    'Ha Giang Loop Ban Do Xanh',
    'Ha Giang',
    'Ha Noi',
    'Phieu luu',
    4,
    '4 ngay 3 dem',
    5490000,
    4.7,
    96,
    'https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=1200&q=80',
    'Cung duong de nho qua Quan Ba, Yen Minh, Meo Vac va deo Ma Pi Leng hung vi.',
    JSON_ARRAY('Cong troi Quan Ba', 'Song Nho Que', 'Deo Ma Pi Leng'),
    JSON_ARRAY('Xe limousine', 'Homestay', '3 bua chinh moi ngay', 'Bao hiem du lich'),
    'published',
    '2026-03-01 09:30:00',
    '2026-03-01 09:30:00'
  ),
  (
    5,
    'ha-long-du-thuyen-giua-ky-quan',
    'Ha Long Du Thuyen Giua Ky Quan',
    'Quang Ninh',
    'Ha Noi',
    'Du thuyen cao cap',
    3,
    '3 ngay 2 dem',
    7190000,
    4.9,
    236,
    'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=80',
    'Trai nghiem nghi dem tren du thuyen, ngam vinh Ha Long sang trong va cheo kayak tren vinh.',
    JSON_ARRAY('Du thuyen ngu dem', 'Hang Sung Sot', 'Kayak tren vinh'),
    JSON_ARRAY('Xe limousine', 'Cabin du thuyen', 'An uong theo chuong trinh', 'Kayak'),
    'published',
    '2026-03-01 09:40:00',
    '2026-03-01 09:40:00'
  );

-- Tour itineraries
INSERT INTO tour_itineraries (tour_id, day_number, title, description) VALUES
  (1, 1, 'Ha Noi - Sa Pa - Ban Cat Cat', 'Khoi hanh buoi sang, check-in khach san va tham quan Ban Cat Cat vao buoi chieu.'),
  (1, 2, 'Fansipan - Ham Rong', 'Di cap treo chinh phuc Fansipan va ngam hoang hon tren nui Ham Rong.'),
  (1, 3, 'Cho Sa Pa - ve Ha Noi', 'Thuong thuc dac san dia phuong va len xe tro ve Ha Noi vao cuoi ngay.'),
  (2, 1, 'Den Da Nang - bien My Khe', 'Don san bay, nhan phong va tu do tam bien vao buoi chieu.'),
  (2, 2, 'Ba Na Hills', 'Tron ngay vui choi o Ba Na Hills va check-in Cau Vang.'),
  (2, 3, 'Ngu Hanh Son - Hoi An', 'Tham quan Ngu Hanh Son, an toi va tha den hoa dang o Hoi An.'),
  (2, 4, 'Mua sam - ket thuc', 'Mua dac san, tra phong va ra san bay tro ve.'),
  (3, 1, 'Check-in resort', 'Bay den Phu Quoc, nghi ngoi va ngam sunset tai thi tran Hoang Hon.'),
  (3, 2, 'Tour dao', 'Di cano den 4 dao, lan ngam san ho va an trua tren dao.'),
  (3, 3, 'Cho dem - ket thuc', 'Mua nuoc mam, ngoc trai va ra san bay tro ve.'),
  (4, 1, 'Ha Noi - Quan Ba', 'Di chuyen bang limousine, nhan phong homestay va giao luu van nghe.'),
  (4, 2, 'Yen Minh - Lung Cu', 'Check-in dinh Lung Cu va tham quan lang van hoa Lo Lo Chai.'),
  (4, 3, 'Ma Pi Leng - Nho Que', 'Di thuyen song Nho Que va ngam canh deo Ma Pi Leng.'),
  (4, 4, 'Ve lai Ha Noi', 'An sang, mua qua dia phuong va len xe tro ve Ha Noi.'),
  (5, 1, 'Ha Noi - Ha Long - len du thuyen', 'Khoi hanh tu Ha Noi, len du thuyen, dung bua trua va ngam hoang hon tren vinh.'),
  (5, 2, 'Hang dong - kayak - tiec toi', 'Kham pha hang dong noi tieng, cheo kayak va tan huong bua toi sang trong tren du thuyen.'),
  (5, 3, 'Binh minh tren vinh - tro ve', 'Tap thai cuc quyen buoi sang, brunch tren tau roi tro ve Ha Noi.');

-- Tour departures
INSERT INTO tour_departures (
  id, tour_id, departure_code, departure_date, slots_total, slots_booked, price, label_text, status
) VALUES
  (1, 1, 'DEP-SAPA-1', '2026-04-05', 20, 8, 4290000, 'Cuoi tuan', 'open'),
  (2, 1, 'DEP-SAPA-2', '2026-04-19', 20, 12, 4390000, 'Le 30/4 som', 'open'),
  (3, 2, 'DEP-DANANG-1', '2026-04-11', 24, 8, 5890000, 'Pho bien', 'open'),
  (4, 2, 'DEP-DANANG-2', '2026-04-25', 24, 14, 6090000, 'Nhom nho', 'open'),
  (5, 3, 'DEP-PHUQUOC-1', '2026-04-08', 20, 14, 6790000, 'Sap het cho', 'open'),
  (6, 3, 'DEP-PHUQUOC-2', '2026-05-02', 24, 10, 6990000, 'Dip le', 'open'),
  (7, 4, 'DEP-HAGIANG-1', '2026-04-14', 20, 11, 5490000, 'Ban chay', 'open'),
  (8, 4, 'DEP-HAGIANG-2', '2026-05-09', 24, 6, 5690000, 'Co nhom ghep', 'open'),
  (9, 5, 'DEP-HALONG-1', '2026-04-18', 16, 8, 7190000, 'Cao cap', 'open'),
  (10, 5, 'DEP-HALONG-2', '2026-05-15', 16, 4, 7390000, 'Sunset cruise', 'open');

-- Bookings
INSERT INTO bookings (
  id, booking_code, user_id, tour_id, departure_id, customer_name, customer_email, customer_phone,
  travelers_count, total_price, status, payment_status, payment_method, notes, timeline_json,
  booked_at, created_at, updated_at
) VALUES
  (
    1,
    'BK-2026-001',
    1,
    2,
    3,
    'Nguyen Demo',
    'demo@tourflow.local',
    '0900000000',
    2,
    11780000,
    'confirmed',
    'paid',
    'The noi dia',
    'Can phong co cua so lon.',
    JSON_ARRAY(
      JSON_OBJECT('title', 'Dat cho thanh cong', 'time', '2026-03-14 09:20', 'detail', 'He thong da giu 2 cho cho tour.'),
      JSON_OBJECT('title', 'Thanh toan hoan tat', 'time', '2026-03-14 09:24', 'detail', 'Khach da thanh toan bang the noi dia.'),
      JSON_OBJECT('title', 'Da xac nhan lich khoi hanh', 'time', '2026-03-15 14:00', 'detail', 'Nhan vien da goi dien xac nhan thong tin.')
    ),
    '2026-03-14 09:20:00',
    '2026-03-14 09:20:00',
    '2026-03-15 14:00:00'
  ),
  (
    2,
    'BK-2026-002',
    1,
    1,
    2,
    'Nguyen Demo',
    'demo@tourflow.local',
    '0900000000',
    3,
    13170000,
    'pending',
    'waiting',
    'Chuyen khoan ngan hang',
    'Muon ngoi gan cua so tren xe.',
    JSON_ARRAY(
      JSON_OBJECT('title', 'Yeu cau dat tour da duoc tao', 'time', '2026-03-18 11:10', 'detail', 'He thong dang giu cho tam thoi trong 24 gio.'),
      JSON_OBJECT('title', 'Cho thanh toan', 'time', '2026-03-18 11:12', 'detail', 'Can hoan tat thanh toan de khoa cho chinh thuc.')
    ),
    '2026-03-18 11:10:00',
    '2026-03-18 11:10:00',
    '2026-03-18 11:12:00'
  ),
  (
    3,
    'BK-2026-003',
    1,
    3,
    5,
    'Nguyen Demo',
    'demo@tourflow.local',
    '0900000000',
    2,
    13580000,
    'completed',
    'paid',
    'Vi dien tu',
    'Khong an cay.',
    JSON_ARRAY(
      JSON_OBJECT('title', 'Dat cho thanh cong', 'time', '2026-03-02 08:40', 'detail', 'Giu cho cho 2 hanh khach.'),
      JSON_OBJECT('title', 'Thanh toan hoan tat', 'time', '2026-03-02 08:45', 'detail', 'Thanh toan qua vi dien tu thanh cong.'),
      JSON_OBJECT('title', 'Da khoi hanh va hoan thanh', 'time', '2026-04-10 20:30', 'detail', 'Tour da ket thuc, san sang danh gia.')
    ),
    '2026-03-02 08:40:00',
    '2026-03-02 08:40:00',
    '2026-04-10 20:30:00'
  );

-- Payments
INSERT INTO payments (
  id, payment_code, booking_id, user_id, amount, method, status, card_name, card_last4, paid_at, created_at, updated_at
) VALUES
  (
    1,
    'PAY-2026-001',
    1,
    1,
    11780000,
    'The noi dia',
    'paid',
    'NGUYEN DEMO',
    '0001',
    '2026-03-14 09:24:00',
    '2026-03-14 09:24:00',
    '2026-03-14 09:24:00'
  ),
  (
    2,
    'PAY-2026-002',
    2,
    1,
    13170000,
    'Chuyen khoan ngan hang',
    'waiting',
    NULL,
    NULL,
    NULL,
    '2026-03-18 11:12:00',
    '2026-03-18 11:12:00'
  ),
  (
    3,
    'PAY-2026-003',
    3,
    1,
    13580000,
    'Vi dien tu',
    'paid',
    'NGUYEN DEMO',
    '9988',
    '2026-03-02 08:45:00',
    '2026-03-02 08:45:00',
    '2026-03-02 08:45:00'
  );

-- Reviews
INSERT INTO reviews (
  id, tour_id, user_id, booking_id, rating, title, content, is_featured, created_at
) VALUES
  (1, 2, 1, 1, 5, 'Chuyen di rat tron ven', 'Lich trinh ro rang, bien dep va dat tour rat nhanh.', 1, '2026-03-20 09:00:00'),
  (2, 1, 2, NULL, 5, 'Sa Pa rat dang di', 'Canh dep, thoi tiet de chiu va huong dan vien nhiet tinh.', 1, '2026-03-21 08:15:00'),
  (3, 3, 1, 3, 4, 'Phu hop cho nghi duong', 'Resort on, cano vui va lich trinh nhe nhang.', 0, '2026-04-11 10:30:00');

-- Testimonials cho landing page
INSERT INTO testimonials (
  id, user_name, role_label, content, sort_order, created_at
) VALUES
  (
    1,
    'Tran Thu Ha',
    'Khach hang quay lai lan 3',
    'Giao dien rat de theo doi, chi can vao tour, chon lich va xem tong tien la minh ra quyet dinh rat nhanh.',
    1,
    '2026-03-20 08:00:00'
  ),
  (
    2,
    'Vu Hoang Nam',
    'Nhom du lich gia dinh',
    'Thong tin lich trinh, lich khoi hanh va booking history duoc dua len ro rang, phu hop de demo luong nguoi dung.',
    2,
    '2026-03-21 08:00:00'
  );
