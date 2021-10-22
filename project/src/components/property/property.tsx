/* eslint-disable jsx-a11y/img-redundant-alt */
import { nanoid } from '@reduxjs/toolkit';
import { useParams } from 'react-router';
import { AuthorizationStatus } from '../../const';
import { Hostel } from '../../mocks/hostel';
import Header from '../header/header';
import Point from '../point/point-item';
import PropertyComment from './property-comment/property-comment';

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
      <Header authorizationStatus = {authorizationStatus} />
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
                    <PropertyComment />
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
