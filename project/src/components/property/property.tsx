/* eslint-disable jsx-a11y/img-redundant-alt */
import { nanoid } from '@reduxjs/toolkit';
import { useParams } from 'react-router';
import { AuthorizationStatus } from '../../const';
import { Hostel } from '../../mocks/hostel';
import LoginLink from '../login/login-link';
import Logo from '../logo/logo';
import Point from '../point/point-item';
import PropertyFormComment from './property-form-comment';

type propertyOptions = {
  hostels: Hostel[],
  authorizationStatus: AuthorizationStatus,
};

function propertyGalleryContainer(hostel: Hostel): JSX.Element{
  const propertyGallery = hostel.images.map((img) => (
    <div className="property__image-wrapper" key = {nanoid()}>
      <img
        className="property__image"
        src={img}
        alt="Photo studio"
      />
    </div>
  ));
  return (
    <div className="property__gallery-container container">
      <div className="property__gallery">
        {propertyGallery}
      </div>
    </div>
  );
}

export default function Property({hostels, authorizationStatus}: propertyOptions): JSX.Element {
  const arrayPoints = hostels.map((hostel) => <Point hostel = {hostel} key = {hostel.id} />);
  const {id} = useParams<{ id: string }>();
  const [hostelProperty] = hostels.filter((hostel) => hostel.id === parseInt(id, 10));
  const favoriteClassName = `property__bookmark-button button ${hostelProperty.is_favorite ?
    'property__bookmark-button--active' : ''}`;
  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
            <nav className="header__nav">
              <LoginLink authorizationStatus = {authorizationStatus} />
            </nav>
          </div>
        </div>
      </header>
      <main className="page__main page__main--property">
        <section className="property">
          {propertyGalleryContainer(hostelProperty)}
          <div className="property__container container">
            <div className="property__wrapper">
              {
                hostelProperty.is_premium
                  ?
                  <div className="property__mark">
                    <span>Premium</span>
                  </div>
                  :
                  ''
              }
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {hostelProperty.title}
                </h1>
                <button className={favoriteClassName} type="button">
                  <svg className="property__bookmark-icon" width={31} height={33}>
                    <use xlinkHref="#icon-bookmark" />
                  </svg>
                  <span className="visually-hidden">{hostelProperty.is_favorite ? 'In bookmarks' : 'To bookmarks'}</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: `${(Math.round(hostelProperty.rating) * 20)}%`}} />
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{hostelProperty.rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {hostelProperty.type.charAt(0).toUpperCase() + hostelProperty.type.slice(1)}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {hostelProperty.bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {hostelProperty.max_adults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">€{hostelProperty.price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {
                    hostelProperty.goods.map((good) => <li className="property__inside-item" key = {nanoid()}>{good}</li>)
                  }
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                    <img
                      className="property__avatar user__avatar"
                      src={hostelProperty.host.avatar_url}
                      alt="Host avatar"
                      width={74}
                      height={74}
                    />
                  </div>
                  <span className="property__user-name">{hostelProperty.host.name}</span>
                  {
                    hostelProperty.host.is_pro
                      ?
                      <span className="property__user-status">Pro</span>
                      :
                      ''
                  }
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {hostelProperty.description}
                  </p>
                </div>
              </div>
              <section className="property__reviews reviews">
                <h2 className="reviews__title">
                  Reviews · <span className="reviews__amount">1</span>
                </h2>
                <ul className="reviews__list">
                  <li className="reviews__item">
                    <div className="reviews__user user">
                      <div className="reviews__avatar-wrapper user__avatar-wrapper">
                        <img
                          className="reviews__avatar user__avatar"
                          src="img/avatar-max.jpg"
                          alt="Reviews avatar"
                          width={54}
                          height={54}
                        />
                      </div>
                      <span className="reviews__user-name">Max</span>
                    </div>
                    <div className="reviews__info">
                      <div className="reviews__rating rating">
                        <div className="reviews__stars rating__stars">
                          <span style={{ width: '80%' }} />
                          <span className="visually-hidden">Rating</span>
                        </div>
                      </div>
                      <p className="reviews__text">
                    A quiet cozy and picturesque that hides behind a a river by
                    the unique lightness of Amsterdam. The building is green and
                    from 18th century.
                      </p>
                      <time className="reviews__time" dateTime="2019-04-24">
                    April 2019
                      </time>
                    </div>
                  </li>
                </ul>
                {
                  authorizationStatus === AuthorizationStatus.Auth
                    ?
                    <form className="reviews__form form" action="#" method="post">
                      <label className="reviews__label form__label" htmlFor="review">
                        Your review
                      </label>
                      <div className="reviews__rating-form form__rating">
                        <input
                          className="form__rating-input visually-hidden"
                          name="rating"
                          defaultValue={5}
                          id="5-stars"
                          type="radio"
                        />
                        <label
                          htmlFor="5-stars"
                          className="reviews__rating-label form__rating-label"
                          title="perfect"
                        >
                          <svg className="form__star-image" width={37} height={33}>
                            <use xlinkHref="#icon-star" />
                          </svg>
                        </label>
                        <input
                          className="form__rating-input visually-hidden"
                          name="rating"
                          defaultValue={4}
                          id="4-stars"
                          type="radio"
                        />
                        <label
                          htmlFor="4-stars"
                          className="reviews__rating-label form__rating-label"
                          title="good"
                        >
                          <svg className="form__star-image" width={37} height={33}>
                            <use xlinkHref="#icon-star" />
                          </svg>
                        </label>
                        <input
                          className="form__rating-input visually-hidden"
                          name="rating"
                          defaultValue={3}
                          id="3-stars"
                          type="radio"
                        />
                        <label
                          htmlFor="3-stars"
                          className="reviews__rating-label form__rating-label"
                          title="not bad"
                        >
                          <svg className="form__star-image" width={37} height={33}>
                            <use xlinkHref="#icon-star" />
                          </svg>
                        </label>
                        <input
                          className="form__rating-input visually-hidden"
                          name="rating"
                          defaultValue={2}
                          id="2-stars"
                          type="radio"
                        />
                        <label
                          htmlFor="2-stars"
                          className="reviews__rating-label form__rating-label"
                          title="badly"
                        >
                          <svg className="form__star-image" width={37} height={33}>
                            <use xlinkHref="#icon-star" />
                          </svg>
                        </label>
                        <input
                          className="form__rating-input visually-hidden"
                          name="rating"
                          defaultValue={1}
                          id="1-star"
                          type="radio"
                        />
                        <label
                          htmlFor="1-star"
                          className="reviews__rating-label form__rating-label"
                          title="terribly"
                        >
                          <svg className="form__star-image" width={37} height={33}>
                            <use xlinkHref="#icon-star" />
                          </svg>
                        </label>
                      </div>
                      {<PropertyFormComment />}
                      <div className="reviews__button-wrapper">
                        <p className="reviews__help">
                      To submit review please make sure to set{' '}
                          <span className="reviews__star">rating</span> and describe your
                      stay with at least{' '}
                          <b className="reviews__text-amount">50 characters</b>.
                        </p>
                        <button
                          className="reviews__submit form__submit button"
                          type="submit"
                          disabled
                        >
                      Submit
                        </button>
                      </div>
                    </form>
                    :
                    ''
                }
              </section>
            </div>
          </div>
          <section className="property__map map" />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              {arrayPoints}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
