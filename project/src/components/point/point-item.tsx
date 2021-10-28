/* eslint-disable no-console */
/* eslint-disable semi */
import { useMemo, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { Hostel } from '../../types/hostel';
import PointLink from './point-link';

type pointOptions = {
  hostel: Hostel,
  onEnterFunction: (value: Hostel | undefined) => void,
  hoverStatus?: boolean,
};

export default function PointItem({hostel, onEnterFunction, hoverStatus}: pointOptions): JSX.Element {
  const raiting = useMemo(() => Math.round(hostel.rating) * 20, [hostel.rating]);
  const favoriteClassName = `place-card__bookmark-button button ${hostel.is_favorite &&
    'place-card__bookmark-button--active'}`;

  const onEnterHandler = (evt: MouseEvent) => {
    evt.preventDefault();
    onEnterFunction(hostel);
  };
  const onLeaveHandler = (evt: MouseEvent) => {
    evt.preventDefault();
    onEnterFunction(undefined);
  };
  const hoverStyle = hoverStatus ? {'opacity': '0.6'} : {};

  return (
    <article className="cities__place-card place-card" onMouseEnter = {onEnterHandler}
      onMouseLeave = {onLeaveHandler} style = {hoverStyle}
    >
      {
        hostel.is_premium &&
          <div className="place-card__mark">
            <span>Premium</span>
          </div>
      }
      <PointLink id = {hostel.id} img = {hostel.preview_image}/>
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
            <span style={{width: `${raiting}%`}} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to = {`/property/${hostel.id}`}>
            {hostel.title}
          </Link>
        </h2>
        <p className="place-card__type" style = {{textTransform: 'capitalize'}}>{hostel.type}</p>
      </div>
    </article>
  );
}
