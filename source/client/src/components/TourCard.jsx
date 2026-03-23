import { Link } from 'react-router-dom';
import { formatCurrency } from '../utils/formatters.js';

function TourCard({ tour }) {
  const formattedPrice = formatCurrency(tour.price);

  return (
    <article className="tour-card">
      <img alt={tour.title} className="tour-card-image" src={tour.image} />
      <div className="tour-card-body">
        <div className="tour-card-topline">
          <span>{tour.category}</span>
          <span>{tour.duration}</span>
        </div>
        <h3>{tour.title}</h3>
        <p>{tour.description}</p>
        <div className="tour-card-meta">
          <span>{tour.location}</span>
          <span>
            {tour.rating}/5 ({tour.reviewCount})
          </span>
        </div>
        <div className="tour-card-footer">
          <div className="tour-card-price">
            <small>Giá từ</small>
            <strong aria-label={formattedPrice} className="tour-card-price-animated">
              {Array.from(formattedPrice).map((character, index) => (
                <span
                  key={`${tour.id}-price-${index}`}
                  className={`tour-card-price-char${
                    character === ' ' || character === '\u00A0' ? ' is-space' : ''
                  }`}
                  style={{ '--char-delay': `${index * 0.05}s` }}
                >
                  {character === ' ' || character === '\u00A0' ? '\u00A0' : character}
                </span>
              ))}
            </strong>
          </div>
          <Link className="button button-secondary" to={`/tours/${tour.id}`}>
            Xem chi tiết
          </Link>
        </div>
      </div>
    </article>
  );
}

export default TourCard;
