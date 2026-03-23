import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import SectionHeading from '../components/SectionHeading.jsx';
import TourCard from '../components/TourCard.jsx';
import { getFeaturedTours, getTestimonials } from '../services/mockApi.js';
import { formatCurrency } from '../utils/formatters.js';

const fallbackSlides = [
  {
    id: 'tour-sapa',
    title: 'Sa Pa Mùa Mây',
    location: 'Lào Cai',
    duration: '3 ngày 2 đêm',
    price: 4290000,
    rating: 4.9,
    reviewCount: 148,
    image:
      'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1400&q=80',
    description: 'Một hành trình săn mây đầy cảm hứng, rất hợp để đổi gió và mang về những khung hình thật đáng nhớ.',
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
      'https://images.unsplash.com/photo-1493558103817-58b2924bce98?auto=format&fit=crop&w=1400&q=80',
    description: 'Sự kết hợp vừa đủ giữa biển xanh, phố cổ và nhịp nghỉ dưỡng nhẹ nhàng cho một kỳ nghỉ trọn vẹn.',
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
      'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1400&q=80',
    description: 'Không khí nghỉ dưỡng sang trọng, biển xanh trong và hoàng hôn đẹp để chuyến đi trở nên thật đáng mong chờ.',
  },
];

const spotlightThemes = [
  {
    badge: 'Lựa chọn nổi bật mùa này',
    ribbon: 'Tour được xem nhiều trong tuần',
    mood: 'Đẹp ở từng điểm dừng, dễ khiến người xem muốn chốt lịch ngay sau khi lướt qua.',
    proof: '3.2k lượt lưu tour trong tuần',
  },
  {
    badge: 'Lịch khởi hành được quan tâm nhiều',
    ribbon: 'Phù hợp cặp đôi và gia đình',
    mood: 'Lịch trình cân bằng giữa trải nghiệm và nghỉ ngơi để chuyến đi luôn dễ chốt hơn.',
    proof: 'Tỷ lệ đặt tour tăng 28%',
  },
  {
    badge: 'Tour nghỉ dưỡng được hỏi nhiều',
    ribbon: 'Lựa chọn lý tưởng để thư giãn',
    mood: 'Một chuyến đi gọn gàng nhưng đủ sang và đủ thư thái để khách muốn giữ chỗ sớm.',
    proof: '9/10 khách xem lại sau khi ghé',
  },
];

const travelGallery = [
  {
    id: 'gallery-1',
    title: 'Biển xanh buổi sớm',
    subtitle: 'Không gian mở đầu hoàn hảo cho một kỳ nghỉ đáng nhớ',
    image:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'gallery-2',
    title: 'Check-in trên đèo',
    subtitle: 'Gợi cảm giác khám phá và rất hợp cho tour trải nghiệm',
    image:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'gallery-3',
    title: 'Phố cổ lên đèn',
    subtitle: 'Lãng mạn, dễ chạm cảm xúc và rất hợp tour nghỉ ngắn ngày',
    image:
      'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'gallery-4',
    title: 'Resort sát biển',
    subtitle: 'Hình ảnh tạo cảm giác nghỉ dưỡng cao cấp ngay từ ánh nhìn đầu',
    image:
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'gallery-5',
    title: 'Bình minh giữa núi',
    subtitle: 'Mang lại cảm hứng đặt tour cho những hành trình thiên nhiên',
    image:
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'gallery-6',
    title: 'Team đi cùng nhau',
    subtitle: 'Tạo cảm giác chuyến đi trọn niềm vui và nhiều kết nối hơn',
    image:
      'https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=1200&q=80',
  },
];

function HomePage() {
  const [featuredTours, setFeaturedTours] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [previousSlideIndex, setPreviousSlideIndex] = useState(null);

  useEffect(() => {
    async function loadPage() {
      const [tourData, testimonialData] = await Promise.all([getFeaturedTours(), getTestimonials()]);
      setFeaturedTours(tourData);
      setTestimonials(testimonialData);
    }

    loadPage();
  }, []);

  const heroSlides = useMemo(() => {
    const sourceSlides = featuredTours.length ? featuredTours : fallbackSlides;

    return sourceSlides.map((tour, index) => ({
      ...tour,
      ...spotlightThemes[index % spotlightThemes.length],
    }));
  }, [featuredTours]);

  useEffect(() => {
    if (!heroSlides.length) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setActiveSlideIndex((current) => {
        setPreviousSlideIndex(current);
        return (current + 1) % heroSlides.length;
      });
    }, 5200);

    return () => window.clearInterval(intervalId);
  }, [heroSlides]);

  useEffect(() => {
    if (!heroSlides.length) {
      setActiveSlideIndex(0);
      return;
    }

    setActiveSlideIndex((current) => current % heroSlides.length);
  }, [heroSlides.length]);

  const activeSlide = heroSlides[activeSlideIndex] ?? heroSlides[0];

  function handleSelectSlide(index) {
    setPreviousSlideIndex(activeSlideIndex);
    setActiveSlideIndex(index);
  }

  function handleNextSlide() {
    setActiveSlideIndex((current) => {
      setPreviousSlideIndex(current);
      return (current + 1) % heroSlides.length;
    });
  }

  function handlePrevSlide() {
    setActiveSlideIndex((current) => {
      setPreviousSlideIndex(current);
      return (current - 1 + heroSlides.length) % heroSlides.length;
    });
  }

  return (
    <div className="page-stack">
      <section className="hero-panel hero-campaign-panel">
        <div className="container hero-stage">
          <div className="hero-copy-panel" key={activeSlide?.id}>
            <p className="section-eyebrow hero-eyebrow">Điểm đến được tìm kiếm nhiều</p>
            <span className="hero-kicker-pill">{activeSlide?.ribbon}</span>
            <h1 className="hero-display">
              <span>Đi nhiều hơn,</span>
              <span className="title-accent">sống rực hơn</span>
              <span>cùng {activeSlide?.title}</span>
            </h1>
            <p className="hero-copy hero-copy-animated">
              {activeSlide?.description} {activeSlide?.mood}
            </p>
            <div className="hero-actions">
              <Link className="button button-primary" to="/tours">
                Khám phá tour ngay
              </Link>
              <Link className="button button-secondary" to={`/tours/${activeSlide?.id ?? 'tour-sapa'}`}>
                Đặt tour nổi bật
              </Link>
            </div>
            <div className="hero-metrics hero-metrics-rich">
              <div className="metric-card">
                <span>Giá ưu tiên hiển thị</span>
                <strong>{formatCurrency(activeSlide?.price ?? 0)}</strong>
              </div>
              <div className="metric-card">
                <span>Đánh giá từ khách đi tour</span>
                <strong>
                  {activeSlide?.rating}/5 · {activeSlide?.reviewCount} lượt
                </strong>
              </div>
              <div className="metric-card">
                <span>Thời lượng phổ biến</span>
                <strong>{activeSlide?.duration}</strong>
              </div>
            </div>
            <div className="hero-ribbon">
              <div className="hero-ribbon-track">
                <span>Ưu tiên tour đẹp và dễ chốt</span>
                <span>Giá tour rõ ràng</span>
                <span>Hình ảnh truyền cảm hứng</span>
                <span>Lịch khởi hành dễ chọn</span>
                <span>Nút đặt tour nổi bật</span>
                <span>Ưu tiên tour đẹp và dễ chốt</span>
                <span>Giá tour rõ ràng</span>
                <span>Hình ảnh truyền cảm hứng</span>
                <span>Lịch khởi hành dễ chọn</span>
                <span>Nút đặt tour nổi bật</span>
              </div>
            </div>
          </div>

          <div className="hero-visual-column">
            <div className="hero-slider-shell">
              {heroSlides.map((slide, index) => {
                let slideState = 'next';

                if (index === activeSlideIndex) {
                  slideState = 'active';
                } else if (index === previousSlideIndex) {
                  slideState = 'previous';
                }

                return (
                  <article className={`hero-slider-card hero-slide-layer ${slideState}`} key={slide.id}>
                    <img alt={slide.title} className="hero-slider-image" src={slide.image} />
                    <div className="hero-slider-overlay" />
                    <div className="hero-slide-content">
                      <p>{slide.badge}</p>
                      <h3>{slide.title}</h3>
                      <p>{slide.description}</p>
                      <div className="hero-slide-meta">
                        <span>{slide.duration}</span>
                        <span>{formatCurrency(slide.price)}</span>
                      </div>
                    </div>
                  </article>
                );
              })}

              <div className="hero-floating-note hero-floating-note-top">
                <span>{activeSlide?.badge}</span>
                <strong>{activeSlide?.proof}</strong>
              </div>
              <div className="hero-floating-note hero-floating-note-bottom">
                <span>Điểm đến nổi bật</span>
                <strong>{activeSlide?.location}</strong>
              </div>

              <div className="hero-slider-controls">
                <button aria-label="Tour trước" className="hero-control-button" type="button" onClick={handlePrevSlide}>
                  &#8249;
                </button>
                <div className="hero-control-dots">
                  {heroSlides.map((slide, index) => (
                    <button
                      key={slide.id}
                      aria-label={`Chọn slide ${index + 1}`}
                      className={index === activeSlideIndex ? 'hero-dot active' : 'hero-dot'}
                      type="button"
                      onClick={() => handleSelectSlide(index)}
                    />
                  ))}
                </div>
                <button aria-label="Tour tiếp theo" className="hero-control-button" type="button" onClick={handleNextSlide}>
                  &#8250;
                </button>
              </div>
            </div>

            <div className="hero-thumb-grid">
              {heroSlides.map((slide, index) => (
                <button
                  key={slide.id}
                  className={index === activeSlideIndex ? 'hero-thumb-card active' : 'hero-thumb-card'}
                  type="button"
                  onClick={() => handleSelectSlide(index)}
                >
                  <img alt={slide.title} src={slide.image} />
                  <div>
                    <strong>{slide.title}</strong>
                    <span>{slide.location}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container section-block visual-story-strip">
        <div className="story-heading">
          <p className="section-eyebrow">Cảm hứng cho chuyến đi tiếp theo</p>
          <h2>Khám phá những hành trình tuyển chọn, sẵn sàng để bạn chọn ngày và đặt tour.</h2>
        </div>
        <div className="travel-gallery-grid">
          {travelGallery.map((item, index) => (
            <article className="travel-gallery-card" key={item.id}>
              <img alt={item.title} className="travel-gallery-image" src={item.image} />
              <div className="travel-gallery-overlay" />
              <div className="travel-gallery-content">
                <span>{index + 1 < 10 ? `0${index + 1}` : index + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.subtitle}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="container section-block">
        <SectionHeading
          eyebrow="Tour nổi bật"
          title="Những hành trình nổi bật dành cho khách đang muốn chốt tour sớm"
          description="Mỗi tour được trình bày rõ ràng từ hình ảnh, giá, thời lượng đến nút xem chi tiết để khách dễ chọn và đặt tour nhanh hơn."
          action={
            <Link className="button button-ghost" to="/tours">
              Xem toàn bộ tour
            </Link>
          }
        />

        <div className="card-grid">
          {featuredTours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
      </section>

      <section className="container section-block experience-strip">
        <div>
          <p className="section-eyebrow">Hành trình đặt tour rõ ràng</p>
          <h2>Từ cảm hứng du lịch đến bước đặt tour, mọi thao tác đều được dẫn dắt rõ và tự nhiên.</h2>
        </div>
        <div className="step-grid">
          <article className="step-card">
            <strong>01</strong>
            <h3>Khám phá điểm đến</h3>
            <p>Ảnh lớn và headline nổi bật giúp khách nhanh chóng bị thu hút vào từng hành trình.</p>
          </article>
          <article className="step-card">
            <strong>02</strong>
            <h3>Chọn lịch phù hợp</h3>
            <p>Ngày khởi hành, thời lượng và mức giá được hiển thị rõ để khách dễ so sánh và ra quyết định.</p>
          </article>
          <article className="step-card">
            <strong>03</strong>
            <h3>Đặt tour nhanh</h3>
            <p>Biểu mẫu ngắn gọn và nút CTA rõ ràng giúp khách chuyển từ xem tour sang giữ chỗ nhanh hơn.</p>
          </article>
          <article className="step-card">
            <strong>04</strong>
            <h3>Theo dõi booking</h3>
            <p>Khách có thể xem lại lịch sử đặt tour trong cùng một giao diện thống nhất và dễ sử dụng.</p>
          </article>
        </div>
      </section>

      <section className="container section-block">
        <SectionHeading
          eyebrow="Trải nghiệm nổi bật"
          title="Một landing page du lịch được tối ưu để mời gọi xem tour và chốt đặt tour"
          description="Hình ảnh giàu cảm hứng, typography sang hơn và bố cục tập trung vào việc đưa khách từ cảm xúc đến hành động đặt tour."
        />

        <div className="testimonial-grid">
          {testimonials.map((item) => (
            <article className="testimonial-card" key={item.id}>
              <p>{item.content}</p>
              <strong>{item.name}</strong>
              <span>{item.role}</span>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
