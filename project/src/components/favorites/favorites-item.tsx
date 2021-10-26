import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Hostel } from '../../types/hostel';
import PointLink from '../point/point-link';

type HostelOptions = {
  hostel: Hostel,
};

export default function FavoritesItem({hostel}: HostelOptions): JSX.Element {
  const rating = useMemo(() => Math.round(hostel.rating) * 20, [hostel.rating]);
  const favoriteClassName = `place-card__bookmark-button button ${hostel.is_favorite &&
    'place-card__bookmark-button--active'}`;

  return (
    <article className="favorites__card place-card">
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <PointLink id = {hostel.id} img = {hostel.preview_image} />
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{hostel.price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <button
            className={favoriteClassName}
            type="button"
          >
            <svg className="place-card__bookmark-icon" width={18} height={19}>
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${rating}%`}} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to = {`/property/${hostel.id}`}>
            {hostel.title}
          </Link>
        </h2>
        <p className="place-card__type" style={{textTransform: 'capitalize'}}>{hostel.type}</p>
      </div>
    </article>
  );
}
