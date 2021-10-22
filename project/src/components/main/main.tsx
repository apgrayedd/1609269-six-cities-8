/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
import Points from '../point/points';
import MainEmpty from './main-empty';
import Logo from '../logo/logo';
import {AuthorizationStatus} from '../../const';
import LoginLink from '../login/login-link';
import { Hostel } from '../../mocks/hostel';
import MainCitiesList from './main-cities-list';

type countPoints = {
  hostels: Hostel[],
  authorizationStatus: AuthorizationStatus,
};

export default function Main({hostels, authorizationStatus}: countPoints): JSX.Element {
  return (
    <div className="page page--gray page--main">
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
      {hostels.length > 0
        ?
        <main className="page__main page__main--index">
          <h1 className="visually-hidden">Cities</h1>
          <div className="tabs">
            <section className="locations container">
              {<MainCitiesList />}
            </section>
          </div>
          <div className="cities">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">312 places to stay in Amsterdam</b>
                <form className="places__sorting" action="#" method="get">
                  <span className="places__sorting-caption">Sort by</span>
                  <span className="places__sorting-type" tabIndex={0}>
                      Popular
                    <svg className="places__sorting-arrow" width="7" height="4">
                      <use xlinkHref="#icon-arrow-select"></use>
                    </svg>
                  </span>
                  <ul className="places__options places__options--custom places__options--opened">
                    <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                    <li className="places__option" tabIndex={0}>Price: low to high</li>
                    <li className="places__option" tabIndex={0}>Price: high to low</li>
                    <li className="places__option" tabIndex={0}>Top rated first</li>
                  </ul>
                </form>
                <Points hostels = {hostels} />
              </section>
              <div className="cities__right-section">
                <section className="cities__map map"></section>
              </div>
            </div>
          </div>
        </main>
        :
        <MainEmpty/>}
    </div>
  );
}
