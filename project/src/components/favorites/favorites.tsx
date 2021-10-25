import { AuthorizationStatus } from '../../const';
import { Hostel } from '../../mocks/hostel';
import Logo from '../logo/logo';
import FavoritesEmpty from './favorites-empty';
import FavoritesList from './favorites-list';

import Header from '../header/header';

type countFavorites = {
  hostels: Hostel[],
  authorizationStatus: AuthorizationStatus,
}

export default function Favorites({hostels, authorizationStatus} : countFavorites): JSX.Element {
  return (
    <div className = 'page'>
      <Header authorizationStatus = {authorizationStatus} />
      <div className="page__favorites-container container">
        {
          hostels.length > 0
            ?
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <FavoritesList hostels = {hostels} />
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
