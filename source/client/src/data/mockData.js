export const tours = [
  {
    id: 'tour-sapa',
    title: 'Sa Pa Mùa Mây',
    location: 'Lào Cai',
    duration: '3 ngày 2 đêm',
    price: 4290000,
    rating: 4.9,
    reviewCount: 148,
    image:
      'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80',
    departurePoint: 'Hà Nội',
    category: 'Núi rừng',
    description:
      'Hành trình săn mây, thăm bản Cát Cát và nghỉ dưỡng trong không khí lạnh của Tây Bắc.',
    highlights: ['Fansipan Legend', 'Bản Cát Cát', 'Săn mây ở Hàm Rồng'],
    inclusions: ['Xe du lịch 2 chiều', 'Khách sạn 3 sao', '3 bữa chính', 'Hướng dẫn viên'],
    itinerary: [
      {
        day: 'Ngày 1',
        title: 'Hà Nội - Sa Pa - Bản Cát Cát',
        description: 'Khởi hành buổi sáng, check-in khách sạn và tham quan Bản Cát Cát vào buổi chiều.',
      },
      {
        day: 'Ngày 2',
        title: 'Fansipan - Hàm Rồng',
        description: 'Đi cáp treo chinh phục Fansipan và ngắm hoàng hôn trên núi Hàm Rồng.',
      },
      {
        day: 'Ngày 3',
        title: 'Chợ Sa Pa - về Hà Nội',
        description: 'Thưởng thức đặc sản địa phương và lên xe trở về Hà Nội vào cuối ngày.',
      },
    ],
    departures: [
      { id: 'dep-sapa-1', date: '2026-04-05', slots: 12, price: 4290000, label: 'Cuối tuần' },
      { id: 'dep-sapa-2', date: '2026-04-19', slots: 8, price: 4390000, label: 'Lễ 30/4 sớm' },
    ],
  },
  {
    id: 'tour-danang',
    title: 'Đà Nẵng - Hội An Rực Nắng',
    location: 'Miền Trung',
    duration: '4 ngày 3 đêm',
    price: 5890000,
    rating: 4.8,
    reviewCount: 203,
    image:
      'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1200&q=80',
    departurePoint: 'TP. HCM',
    category: 'Biển phố',
    description:
      'Combo tham quan biển Mỹ Khê, cầu Rồng, phố cổ Hội An và buffet hải sản về đêm.',
    highlights: ['Biển Mỹ Khê', 'Bà Nà Hills', 'Phố cổ Hội An'],
    inclusions: ['Vé máy bay khứ hồi', 'Khách sạn 4 sao', 'Buffet hải sản', 'Vé tham quan'],
    itinerary: [
      {
        day: 'Ngày 1',
        title: 'Đến Đà Nẵng - biển Mỹ Khê',
        description: 'Đón sân bay, nhận phòng và tự do tắm biển vào buổi chiều.',
      },
      {
        day: 'Ngày 2',
        title: 'Bà Nà Hills',
        description: 'Trọn ngày vui chơi ở Bà Nà Hills và check-in Cầu Vàng.',
      },
      {
        day: 'Ngày 3',
        title: 'Ngũ Hành Sơn - Hội An',
        description: 'Tham quan Ngũ Hành Sơn, ăn tối và thả đèn hoa đăng ở Hội An.',
      },
      {
        day: 'Ngày 4',
        title: 'Mua sắm - kết thúc',
        description: 'Mua đặc sản, trả phòng và ra sân bay trở về.',
      },
    ],
    departures: [
      { id: 'dep-danang-1', date: '2026-04-11', slots: 16, price: 5890000, label: 'Phổ biến' },
      { id: 'dep-danang-2', date: '2026-04-25', slots: 10, price: 6090000, label: 'Nhóm nhỏ' },
    ],
  },
  {
    id: 'tour-phuquoc',
    title: 'Phú Quốc Sunset Escape',
    location: 'Kiên Giang',
    duration: '3 ngày 2 đêm',
    price: 6790000,
    rating: 4.9,
    reviewCount: 187,
    image:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    departurePoint: 'Cần Thơ',
    category: 'Nghỉ dưỡng',
    description:
      'Trải nghiệm cano 4 đảo, ngắm san hô, Sunset Town và đêm nhạc trên bãi biển.',
    highlights: ['Cano 4 đảo', 'Sunset Town', 'Chợ đêm Dương Đông'],
    inclusions: ['Resort 4 sao', 'Ăn sáng buffet', 'Tour cano', 'Xe đưa đón'],
    itinerary: [
      {
        day: 'Ngày 1',
        title: 'Check-in resort',
        description: 'Bay đến Phú Quốc, nghỉ ngơi và ngắm sunset tại thị trấn Hoàng Hôn.',
      },
      {
        day: 'Ngày 2',
        title: 'Tour đảo',
        description: 'Đi cano đến 4 đảo, lặn ngắm san hô và ăn trưa trên đảo.',
      },
      {
        day: 'Ngày 3',
        title: 'Chợ đêm - kết thúc',
        description: 'Mua nước mắm, ngọc trai và ra sân bay trở về.',
      },
    ],
    departures: [
      { id: 'dep-phuquoc-1', date: '2026-04-08', slots: 6, price: 6790000, label: 'Sắp hết chỗ' },
      { id: 'dep-phuquoc-2', date: '2026-05-02', slots: 14, price: 6990000, label: 'Dịp lễ' },
    ],
  },
  {
    id: 'tour-hagiang',
    title: 'Hà Giang Loop Bản Đồ Xanh',
    location: 'Hà Giang',
    duration: '4 ngày 3 đêm',
    price: 5490000,
    rating: 4.7,
    reviewCount: 96,
    image:
      'https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=1200&q=80',
    departurePoint: 'Hà Nội',
    category: 'Phiêu lưu',
    description:
      'Cung đường để nhớ qua Quản Bạ, Yên Minh, Mèo Vạc và đèo Mã Pì Lèng hùng vĩ.',
    highlights: ['Cổng trời Quản Bạ', 'Sông Nho Quế', 'Đèo Mã Pì Lèng'],
    inclusions: ['Xe limousine', 'Homestay', '3 bữa chính mỗi ngày', 'Bảo hiểm du lịch'],
    itinerary: [
      {
        day: 'Ngày 1',
        title: 'Hà Nội - Quản Bạ',
        description: 'Di chuyển bằng limousine, nhận phòng homestay và giao lưu văn nghệ.',
      },
      {
        day: 'Ngày 2',
        title: 'Yên Minh - Lũng Cú',
        description: 'Check-in đỉnh Lũng Cú và tham quan làng văn hóa Lô Lô Chải.',
      },
      {
        day: 'Ngày 3',
        title: 'Mã Pì Lèng - Nho Quế',
        description: 'Đi thuyền sông Nho Quế và ngắm cảnh đèo Mã Pì Lèng.',
      },
      {
        day: 'Ngày 4',
        title: 'Về lại Hà Nội',
        description: 'Ăn sáng, mua quà địa phương và lên xe trở về Hà Nội.',
      },
    ],
    departures: [
      { id: 'dep-hagiang-1', date: '2026-04-14', slots: 9, price: 5490000, label: 'Bán chạy' },
      { id: 'dep-hagiang-2', date: '2026-05-09', slots: 18, price: 5690000, label: 'Có nhóm ghép' },
    ],
  },
  {
    id: 'tour-dalat',
    title: 'Đà Lạt Sương Mai Và Mùa Hoa',
    location: 'Lâm Đồng',
    duration: '3 ngày 2 đêm',
    price: 4590000,
    rating: 4.8,
    reviewCount: 164,
    image:
      'https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=1200&q=80',
    departurePoint: 'TP. HCM',
    category: 'Thành phố hoa',
    description:
      'Hành trình thư giãn giữa đồi thông, săn mây sớm, uống cà phê view thung lũng và check-in những góc Đà Lạt được yêu thích nhất.',
    highlights: ['Đồi chè Cầu Đất', 'Quảng trường Lâm Viên', 'Thung lũng đèn'],
    inclusions: ['Xe khứ hồi chất lượng cao', 'Khách sạn trung tâm', 'Ăn sáng mỗi ngày', 'Vé tham quan'],
    itinerary: [
      {
        day: 'Ngày 1',
        title: 'TP. HCM - Đà Lạt - hồ Xuân Hương',
        description: 'Khởi hành buổi sáng, nhận phòng và dạo quanh hồ Xuân Hương, chợ đêm Đà Lạt vào buổi tối.',
      },
      {
        day: 'Ngày 2',
        title: 'Săn mây Cầu Đất - vườn hoa - cà phê đồi',
        description: 'Đón bình minh tại Cầu Đất, tham quan vườn hoa và tận hưởng không khí se lạnh tại các quán cà phê đồi.',
      },
      {
        day: 'Ngày 3',
        title: 'Langbiang - đặc sản - trở về',
        description: 'Khám phá khu Langbiang, mua đặc sản rồi lên xe trở về vào cuối ngày.',
      },
    ],
    departures: [
      { id: 'dep-dalat-1', date: '2026-04-10', slots: 15, price: 4590000, label: 'Được yêu thích' },
      { id: 'dep-dalat-2', date: '2026-04-24', slots: 11, price: 4790000, label: 'Cuối tuần đẹp' },
    ],
  },
  {
    id: 'tour-nhatrang',
    title: 'Nha Trang Biển Xanh Và Du Thuyền Vịnh',
    location: 'Khánh Hòa',
    duration: '4 ngày 3 đêm',
    price: 6290000,
    rating: 4.9,
    reviewCount: 218,
    image:
      'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80',
    departurePoint: 'Hà Nội',
    category: 'Biển nghỉ dưỡng',
    description:
      'Kỳ nghỉ ngập nắng với bãi biển xanh, trải nghiệm du thuyền trên vịnh, tắm bùn thư giãn và thưởng thức hải sản tươi.',
    highlights: ['Vịnh Nha Trang', 'VinWonders', 'Tắm bùn khoáng'],
    inclusions: ['Vé máy bay khứ hồi', 'Khách sạn gần biển', 'Ăn sáng buffet', 'Tour vịnh nửa ngày'],
    itinerary: [
      {
        day: 'Ngày 1',
        title: 'Đến Nha Trang - check-in bãi biển',
        description: 'Đón sân bay, nhận phòng và tự do dạo biển Trần Phú, thưởng thức ẩm thực buổi tối.',
      },
      {
        day: 'Ngày 2',
        title: 'Du thuyền vịnh - lặn ngắm san hô',
        description: 'Lên du thuyền khám phá vịnh, lặn ngắm san hô và dùng bữa trưa trên biển.',
      },
      {
        day: 'Ngày 3',
        title: 'VinWonders - tắm bùn',
        description: 'Vui chơi nguyên ngày tại VinWonders, buổi chiều thư giãn với dịch vụ tắm bùn khoáng.',
      },
      {
        day: 'Ngày 4',
        title: 'Mua quà - kết thúc hành trình',
        description: 'Tự do mua đặc sản, trả phòng và ra sân bay trở về.',
      },
    ],
    departures: [
      { id: 'dep-nhatrang-1', date: '2026-04-17', slots: 13, price: 6290000, label: 'Biển đẹp' },
      { id: 'dep-nhatrang-2', date: '2026-05-01', slots: 7, price: 6590000, label: 'Dịp lễ hot' },
    ],
  },
  {
    id: 'tour-ninhbinh',
    title: 'Ninh Bình Di Sản Tràng An',
    location: 'Ninh Bình',
    duration: '2 ngày 1 đêm',
    price: 3290000,
    rating: 4.7,
    reviewCount: 131,
    image:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
    departurePoint: 'Hà Nội',
    category: 'Di sản thiên nhiên',
    description:
      'Hành trình ngắn ngày nhưng giàu trải nghiệm với non nước Tràng An, Hang Múa, chùa Bái Đính và cảnh sắc yên bình của cố đô.',
    highlights: ['Tràng An', 'Hang Múa', 'Chùa Bái Đính'],
    inclusions: ['Xe du lịch đưa đón', 'Khách sạn 3 sao', '2 bữa chính', 'Vé tham quan'],
    itinerary: [
      {
        day: 'Ngày 1',
        title: 'Hà Nội - Bái Đính - Tràng An',
        description: 'Khởi hành buổi sáng, tham quan chùa Bái Đính rồi ngồi thuyền khám phá danh thắng Tràng An.',
      },
      {
        day: 'Ngày 2',
        title: 'Hang Múa - Tam Cốc - về Hà Nội',
        description: 'Leo Hang Múa ngắm toàn cảnh, ghé Tam Cốc và trở về Hà Nội vào chiều muộn.',
      },
    ],
    departures: [
      { id: 'dep-ninhbinh-1', date: '2026-04-12', slots: 20, price: 3290000, label: 'Tour ngắn ngày' },
      { id: 'dep-ninhbinh-2', date: '2026-04-26', slots: 14, price: 3390000, label: 'Dễ ghép đoàn' },
    ],
  },
  {
    id: 'tour-quynhon',
    title: 'Quy Nhơn Kỳ Co Eo Gió Trong Xanh',
    location: 'Bình Định',
    duration: '3 ngày 2 đêm',
    price: 5390000,
    rating: 4.8,
    reviewCount: 142,
    image:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    departurePoint: 'Đà Nẵng',
    category: 'Biển khám phá',
    description:
      'Khám phá vùng biển trong xanh của miền Trung với Kỳ Co, Eo Gió, làng chài Nhơn Lý và các điểm check-in rất được ưa chuộng.',
    highlights: ['Kỳ Co', 'Eo Gió', 'Làng chài Nhơn Lý'],
    inclusions: ['Xe du lịch', 'Khách sạn 4 sao', 'Ăn hải sản', 'Cano tham quan đảo'],
    itinerary: [
      {
        day: 'Ngày 1',
        title: 'Đến Quy Nhơn - dạo biển',
        description: 'Nhận phòng khách sạn, tham quan quảng trường biển và thưởng thức hải sản địa phương.',
      },
      {
        day: 'Ngày 2',
        title: 'Kỳ Co - Eo Gió - Nhơn Lý',
        description: 'Di chuyển bằng cano ra Kỳ Co, check-in Eo Gió và khám phá nhịp sống làng chài Nhơn Lý.',
      },
      {
        day: 'Ngày 3',
        title: 'Tháp Đôi - mua quà - kết thúc',
        description: 'Tham quan Tháp Đôi, mua đặc sản rồi lên đường trở về.',
      },
    ],
    departures: [
      { id: 'dep-quynhon-1', date: '2026-04-09', slots: 10, price: 5390000, label: 'Đang săn nhiều' },
      { id: 'dep-quynhon-2', date: '2026-05-07', slots: 16, price: 5590000, label: 'Biển đầu hè' },
    ],
  },
  {
    id: 'tour-halong',
    title: 'Hạ Long Du Thuyền Giữa Kỳ Quan',
    location: 'Quảng Ninh',
    duration: '3 ngày 2 đêm',
    price: 7190000,
    rating: 4.9,
    reviewCount: 236,
    image:
      'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=80',
    departurePoint: 'Hà Nội',
    category: 'Du thuyền cao cấp',
    description:
      'Trải nghiệm nghỉ đêm trên du thuyền, ngắm vịnh Hạ Long sang trọng, chèo kayak và thưởng thức bữa tối giữa kỳ quan thiên nhiên.',
    highlights: ['Du thuyền ngủ đêm', 'Hang Sửng Sốt', 'Kayak trên vịnh'],
    inclusions: ['Xe limousine', 'Cabin du thuyền', 'Ăn uống theo chương trình', 'Kayak'],
    itinerary: [
      {
        day: 'Ngày 1',
        title: 'Hà Nội - Hạ Long - lên du thuyền',
        description: 'Khởi hành từ Hà Nội, lên du thuyền, dùng bữa trưa và ngắm hoàng hôn trên vịnh.',
      },
      {
        day: 'Ngày 2',
        title: 'Hang động - kayak - tiệc tối',
        description: 'Khám phá hang động nổi tiếng, chèo kayak và tận hưởng bữa tối sang trọng trên du thuyền.',
      },
      {
        day: 'Ngày 3',
        title: 'Bình minh trên vịnh - trở về',
        description: 'Tập thái cực quyền buổi sáng, brunch trên tàu rồi trở về Hà Nội.',
      },
    ],
    departures: [
      { id: 'dep-halong-1', date: '2026-04-18', slots: 8, price: 7190000, label: 'Cao cấp' },
      { id: 'dep-halong-2', date: '2026-05-15', slots: 12, price: 7390000, label: 'Sunset cruise' },
    ],
  },
];

export const bookingHistory = [
  {
    id: 'BK-2026-001',
    tourId: 'tour-danang',
    departureId: 'dep-danang-1',
    bookedAt: '2026-03-14',
    departureDate: '2026-04-11',
    status: 'confirmed',
    paymentStatus: 'paid',
    travelers: 2,
    totalPrice: 11780000,
    customerName: 'Nguyễn Minh Châu',
    customerEmail: 'chau@example.com',
    customerPhone: '0908123456',
    notes: 'Cần phòng có cửa sổ lớn.',
    paymentMethod: 'Thẻ nội địa',
    timeline: [
      { title: 'Đặt chỗ thành công', time: '2026-03-14 09:20', detail: 'Hệ thống đã giữ 2 chỗ cho tour.' },
      { title: 'Thanh toán hoàn tất', time: '2026-03-14 09:24', detail: 'Khách đã thanh toán bằng thẻ nội địa.' },
      { title: 'Đã xác nhận lịch khởi hành', time: '2026-03-15 14:00', detail: 'Nhân viên đã gọi điện xác nhận thông tin.' },
    ],
  },
  {
    id: 'BK-2026-002',
    tourId: 'tour-sapa',
    departureId: 'dep-sapa-2',
    bookedAt: '2026-03-18',
    departureDate: '2026-04-19',
    status: 'pending',
    paymentStatus: 'waiting',
    travelers: 3,
    totalPrice: 13170000,
    customerName: 'Lê Quốc Anh',
    customerEmail: 'anh@example.com',
    customerPhone: '0911222333',
    notes: 'Muốn ngồi gần cửa sổ trên xe.',
    paymentMethod: 'Chuyển khoản ngân hàng',
    timeline: [
      { title: 'Yêu cầu đặt tour đã được tạo', time: '2026-03-18 11:10', detail: 'Hệ thống đang giữ chỗ tạm thời trong 24 giờ.' },
      { title: 'Chờ thanh toán', time: '2026-03-18 11:12', detail: 'Cần hoàn tất thanh toán để khóa chỗ chính thức.' },
    ],
  },
  {
    id: 'BK-2026-003',
    tourId: 'tour-phuquoc',
    departureId: 'dep-phuquoc-1',
    bookedAt: '2026-03-02',
    departureDate: '2026-04-08',
    status: 'completed',
    paymentStatus: 'paid',
    travelers: 2,
    totalPrice: 13580000,
    customerName: 'Phạm Gia Huy',
    customerEmail: 'huy@example.com',
    customerPhone: '0988777666',
    notes: 'Không ăn cay.',
    paymentMethod: 'Ví điện tử',
    timeline: [
      { title: 'Đặt chỗ thành công', time: '2026-03-02 08:40', detail: 'Giữ chỗ cho 2 hành khách.' },
      { title: 'Thanh toán hoàn tất', time: '2026-03-02 08:45', detail: 'Thanh toán qua ví điện tử thành công.' },
      { title: 'Đã khởi hành và hoàn thành', time: '2026-04-10 20:30', detail: 'Tour đã kết thúc, sẵn sàng đánh giá.' },
    ],
  },
];

export const testimonials = [
  {
    id: 'review-1',
    name: 'Trần Thu Hà',
    role: 'Khách hàng quay lại lần 3',
    content: 'Giao diện rất dễ theo dõi, chỉ cần vào tour, chọn lịch và xem tổng tiền là mình ra quyết định rất nhanh.',
  },
  {
    id: 'review-2',
    name: 'Vũ Hoàng Nam',
    role: 'Nhóm du lịch gia đình',
    content: 'Thông tin lịch trình, lịch khởi hành và booking history được đưa lên rõ ràng, phù hợp để demo luồng người dùng.',
  },
];

/**
 * Tìm tour theo id trong bộ dữ liệu mock để mô phỏng truy vấn chi tiết tour.
 */
export function getTourById(tourId) {
  return tours.find((tour) => tour.id === tourId);
}

/**
 * Tìm booking theo id trong bộ dữ liệu mock để dùng cho trang thanh toán và xem chi tiết đơn.
 */
export function getBookingById(bookingId) {
  return bookingHistory.find((booking) => booking.id === bookingId);
}
