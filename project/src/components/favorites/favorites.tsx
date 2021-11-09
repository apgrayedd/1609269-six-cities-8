import { State } from '../../types/state';
import Logo from '../logo/logo';
import FavoritesEmpty from './favorites-empty';
import FavoritesList from './favorites-list';
import Header from '../header/header';
import { connect, ConnectedProps } from 'react-redux';

const stateToProps = ({filteredHostels, authorizationStatus}:State) => ({
  filteredHostels,
  authorizationStatus,
});
const connector = connect(stateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

function Favorites({filteredHostels, authorizationStatus}: PropsFromRedux): JSX.Element {
  return (
    <div className = 'page'>
      <Header authorizationStatus = {authorizationStatus} />
      <div className="page__favorites-container container">
        {
          filteredHostels.length > 0
            ?
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <FavoritesList />
            </section>
            : <FavoritesEmpty/>
        }
      </div>
      <footer className="footer container">
        <Logo />
      </footer>
    </div>
  );
}

export {Favorites};
export default connector(Favorites);
