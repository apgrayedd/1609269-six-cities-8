/* eslint-disable jsx-a11y/anchor-is-valid */
import LoginLink from '../login/login-link';
import Logo from '../logo/logo';
import FavoritesEmpty from './favorites-empty';
import FavoritesList from './favorites-list';
import { AuthorizationStatus } from '../../const';
import { Hostel } from '../../mocks/hostel';

type countFavorites = {
  hostels: Hostel[],
  authorizationStatus: AuthorizationStatus,
}

export default function Favorites({hostels, authorizationStatus} : countFavorites): JSX.Element {
  return (
    <div className = 'page'>
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
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <FavoritesList hostels = {hostels} />
          </section>
        </div>
        :
        <FavoritesEmpty/>}
      <footer className="footer container">
        <Logo />
      </footer>
    </div>
  );
}
