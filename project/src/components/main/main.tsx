import {AuthorizationStatus} from '../../const';
import { Hostel } from '../../mocks/hostel';
import Header from '../header/header';
import PointList from '../point/point-list';
import MainEmpty from './main-empty';
import MainCitiesList from './main-cities-list';

type countPoints = {
  hostels: Hostel[],
  authorizationStatus: AuthorizationStatus,
};

export default function Main({hostels, authorizationStatus}: countPoints): JSX.Element {
  return (
    <div className={`page page--gray page--main ${!hostels.length && 'page__main--index-empty'}`}>
      <Header authorizationStatus = {authorizationStatus} />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            {<MainCitiesList />}
          </section>
        </div>
        <div className="cities">
          {
            hostels.length
              ?
              <div className="cities__places-container container">
                <section className="cities__places places">
                  <h2 className="visually-hidden">Places</h2>
                  <b className="places__found">{hostels.length} places to stay in Amsterdam</b>
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
                  <PointList hostels = {hostels} />
                </section>
                <div className="cities__right-section">
                  <section className="cities__map map"></section>
                </div>
              </div>
              : <MainEmpty/>
          }
        </div>
      </main>
    </div>
  );
}
