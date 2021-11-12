
import Header from '../header/header';
import PointList from '../point/point-list';
import MainEmpty from './main-empty';
import MainCitiesList from './main-cities-list';
import Map from '../map/map';
import { State } from '../../types/state';
import { connect,ConnectedProps } from 'react-redux';
import Sorting from '../sorting/sorting';

const statesToProps = ({filteredHostels, authorizationStatus}: State) => ({
  filteredHostels,
});
const connector = connect(statesToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

function Main({filteredHostels}: PropsFromRedux): JSX.Element {
  return (
    <div className={`page page--gray page--main ${!filteredHostels.length && 'page__main--index-empty'}`}>
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
            filteredHostels.length
              ?
              <div className="cities__places-container container">
                <section className="cities__places places">
                  <h2 className="visually-hidden">Places</h2>
                  <b className="places__found">{filteredHostels.length} places to stay in Amsterdam</b>
                  <Sorting />
                  <PointList />
                </section>
                <div className="cities__right-section">
                  <section className="cities__map map">
                    <Map hostels = {filteredHostels}/>
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

export {Main};
export default connector(Main);
