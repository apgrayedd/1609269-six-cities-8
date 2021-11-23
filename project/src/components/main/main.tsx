import Header from '../header/header';
import PointList from '../point/point-list';
import MainEmpty from './main-empty';
import MainCitiesList from './main-cities-list';
import Map from '../map/map';
import { useSelector } from 'react-redux';
import { getFilteredHostels } from '../../store/data-process/selectors';

function Main(): JSX.Element {
  const hostels = useSelector(getFilteredHostels);
  return (
    <div className={`page page--gray page--main ${!hostels.length && 'page__main--index-empty'}`}>
      <Header />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            {<MainCitiesList/>}
          </section>
        </div>
        <div className="cities">
          {
            hostels.length
              ?
              <div className="cities__places-container container">
                <PointList />
                <div className="cities__right-section">
                  <section className="cities__map map">
                    <Map hostels = {hostels}/>
                  </section>
                </div>
              </div>
              : <MainEmpty/>
          }
        </div>
      </main>
    </div>
  );
}

export default Main;
