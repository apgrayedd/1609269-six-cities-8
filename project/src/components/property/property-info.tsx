import { nanoid } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { getNearbyHostels } from '../../store/data-process/selectors';
import { Hostel } from '../../types/hostel';
import Header from '../header/header';
import PropertyFavorite from './property-favorite';
import PropertyNeighbourhoodList from './property-neighbourhood-list';
import PropertyReviews from './property-reviews/property-reviews';
import Map from '../map/map';
import { useMemo } from 'react';

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

function PropertyInfo({hostel}:{hostel:Hostel}): JSX.Element {
  const nearbyHostelsProperty = useSelector(getNearbyHostels);
  const raiting = useMemo(() => Math.round(hostel.rating) * 20,[hostel.rating]);

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--property">
        <section className="property">
          {propertyGalleryContainer(hostel)}
          <div className="property__container container">
            <div className="property__wrapper">
              {
                hostel.is_premium &&
                <div className="property__mark">
                  <span>Premium</span>
                </div>
              }
              <PropertyFavorite hostel = {hostel}/>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: `${raiting}%`}} />
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{hostel.rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire" style = {{textTransform: 'capitalize'}}>
                  {hostel.type}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {hostel.bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                Max {hostel.max_adults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">€{hostel.price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {
                    hostel.goods.map((good) => <li className="property__inside-item" key = {nanoid()}>{good}</li>)
                  }
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className={`property__avatar-wrapper user__avatar-wrapper ${hostel.host.is_pro && 'property__avatar-wrapper--pro'}`}>
                    <img
                      className="property__avatar user__avatar"
                      src={hostel.host.avatar_url}
                      alt="Host avatar"
                      width={74}
                      height={74}
                    />
                  </div>
                  <span className="property__user-name">{hostel.host.name}</span>
                  {
                    hostel.host.is_pro &&
                    <span className="property__user-status">Pro</span>
                  }
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {hostel.description}
                  </p>
                </div>
              </div>
              <PropertyReviews id = {hostel.id}/>
            </div>
          </div>
          <section className="property__map map">
            {
              nearbyHostelsProperty &&
              <Map activeHostelId = {hostel.id} hostels = {nearbyHostelsProperty}/>
            }
          </section>
        </section>
        <div className="container">
          <PropertyNeighbourhoodList />
        </div>
      </main>
    </div>
  );
}

export default PropertyInfo;
