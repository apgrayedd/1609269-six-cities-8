/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
import PointLink from './point-link';

type pointOptions = {
  id: number,
};

export default function Point({id}: pointOptions): JSX.Element {
  const favoriteClassName = `place-card__bookmark-button button ${Math.random() > 0.5 ?
    'place-card__bookmark-button--active' : ''}`;
  return (
    <article className="cities__place-card place-card">
      <div className="place-card__mark">
        <span>Premium</span>
      </div>
      <PointLink id = {id}/>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€120</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <button className={favoriteClassName} type="button">
            <svg className="place-card__bookmark-icon" width={18} height={19}>
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: '80%'}} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="#">Beautiful &amp; luxurious apartment at great location</a>
        </h2>
        <p className="place-card__type">Apartment</p>
      </div>
    </article>
  );
}
