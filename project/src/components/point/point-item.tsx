import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Hostel } from '../../mocks/hostel';
import PointLink from './point-link';

type pointOptions = {
  hostel: Hostel,
};

export default function PointItem({hostel}: pointOptions): JSX.Element {
  const stateHover = useState(false);
  const [status, setHoverStatus] = stateHover;
  const favoriteClassName = `place-card__bookmark-button button ${hostel.is_favorite ?
    'place-card__bookmark-button--active' : ''}`;

  return (
    <article className="cities__place-card place-card"
      onMouseOver={() => setHoverStatus(!status)}
      onMouseOut ={() => setHoverStatus(!status)}
    >
      {
        hostel.is_premium
          ?
          <div className="place-card__mark">
            <span>Premium</span>
          </div>
          : ''
      }
      <PointLink id = {hostel.id} imgLinlk = {hostel.preview_image}/>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{hostel.price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <button className={favoriteClassName} type="button">
            <svg className="place-card__bookmark-icon" width={18} height={19}>
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">{hostel.is_favorite ? 'In bookmarks' : 'To bookmarks'}</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${(Math.round(hostel.rating) * 20)}%`}} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to = {`/property/${hostel.id}`}>
            {hostel.title}
          </Link>
        </h2>
        <p className="place-card__type">{hostel.type.charAt(0).toUpperCase() + hostel.type.slice(1)}</p>
      </div>
    </article>
  );
}
