import { useEffect, useMemo, useState } from 'react';
import SectionHeading from '../components/SectionHeading.jsx';
import TourCard from '../components/TourCard.jsx';
import { getAllTours } from '../services/mockApi.js';

function TourListPage() {
  const [tours, setTours] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('all');

  useEffect(() => {
    async function loadTours() {
      const data = await getAllTours();
      setTours(data);
    }

    loadTours();
  }, []);

  const categories = useMemo(() => ['all', ...new Set(tours.map((tour) => tour.category))], [tours]);

  const filteredTours = useMemo(() => {
    return tours.filter((tour) => {
      const matchesKeyword =
        tour.title.toLowerCase().includes(keyword.toLowerCase()) ||
        tour.location.toLowerCase().includes(keyword.toLowerCase());
      const matchesCategory = category === 'all' || tour.category === category;

      return matchesKeyword && matchesCategory;
    });
  }, [category, keyword, tours]);

  return (
    <div className="container page-stack">
      <section className="page-banner">
        <SectionHeading
          eyebrow="Danh sách tour"
          title="Lọc nhanh để thấy hình dung luồng tìm kiếm tour"
          description="Mock data đang được dùng để user có thể tìm, lọc và bấm vào chi tiết tour trước khi nối backend."
        />
      </section>

      <section className="filters-panel">
        <label className="form-field">
          <span>Tìm theo tên tour hoặc địa điểm</span>
          <input
            placeholder="Ví dụ: Sa Pa, Phú Quốc..."
            type="text"
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
          />
        </label>

        <label className="form-field">
          <span>Loại tour</span>
          <select value={category} onChange={(event) => setCategory(event.target.value)}>
            {categories.map((item) => (
              <option key={item} value={item}>
                {item === 'all' ? 'Tất cả' : item}
              </option>
            ))}
          </select>
        </label>
      </section>

      <section className="card-grid">
        {filteredTours.map((tour) => (
          <TourCard key={tour.id} tour={tour} />
        ))}
      </section>
    </div>
  );
}

export default TourListPage;
