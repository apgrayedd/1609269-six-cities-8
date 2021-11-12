import { nanoid } from '@reduxjs/toolkit';
import { Dispatch, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useParams } from 'react-router';
import { getOfferInfo } from '../..';
import { changeLoaderStatus } from '../../store/action';
import { Actions } from '../../types/action';
import { Hostel } from '../../types/hostel';
import { State } from '../../types/state';
import Header from '../header/header';
import LoadingSpinner from '../loading-spinner/loading-spinner';
import Map from '../map/map';
import Page404 from '../page-404/page-404';
import PropertyNeighbourhoodList from './property-neighbourhood-list';
import PropertyReviews from './property-reviews/property-reviews';

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

const stateToProps = ({nearbyHostelsProperty,hostelProperty, authorizationStatus}:State) => ({
  nearbyHostelsProperty,
  hostelProperty,
  authorizationStatus,
});
const dispatchToProps = (dispatch:Dispatch<Actions>) => ({
  setLoaderStatus(status: boolean) {
    dispatch(changeLoaderStatus(status));
  },
});
const connector = connect(stateToProps, dispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

function Property({nearbyHostelsProperty, hostelProperty, authorizationStatus}: PropsFromRedux): JSX.Element {
  const {id} = useParams<{ id: string }>();
  const [statusError, setError] = useState<boolean>(false);

  if ((hostelProperty === undefined && !statusError) ||
  (hostelProperty && hostelProperty.id !== parseInt(id,10) && !statusError)) {
    getOfferInfo(
      parseInt(id, 10),
      () => setError(false),
      () => setError(true),
    );
    return <LoadingSpinner />;
  }
  if (statusError || hostelProperty === undefined) {
    return  <Page404 />;
  }
  const raiting = Math.round(hostelProperty.rating) * 20;
  const favoriteClassName = `property__bookmark-button button ${hostelProperty.is_favorite &&
    'property__bookmark-button--active'}`;
  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--property">
        <section className="property">
          {propertyGalleryContainer(hostelProperty)}
          <div className="property__container container">
            <div className="property__wrapper">
              {
                hostelProperty.is_premium &&
                  <div className="property__mark">
                    <span>Premium</span>
                  </div>
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
                  <span style={{width: `${raiting}%`}} />
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{hostelProperty.rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire" style = {{textTransform: 'capitalize'}}>
                  {hostelProperty.type}
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
                  <div className={`property__avatar-wrapper user__avatar-wrapper ${hostelProperty.host.is_pro && 'property__avatar-wrapper--pro'}`}>
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
                    hostelProperty.host.is_pro &&
                      <span className="property__user-status">Pro</span>
                  }
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {hostelProperty.description}
                  </p>
                </div>
              </div>
              <PropertyReviews id = {parseInt(id,10)}/>
            </div>
          </div>
          <section className="property__map map">
            {
              nearbyHostelsProperty &&
                <Map activeHostelId = {parseInt(id,10)} hostels = {nearbyHostelsProperty}/>
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

export {Property};
export default connector(Property);
