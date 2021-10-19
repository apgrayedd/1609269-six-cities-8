/* eslint-disable jsx-a11y/anchor-is-valid */
import LoginLink from '../login/login-link';
import Logo from '../logo/logo';
import FavoritesEmpty from './favorites-empty';
import FavoritesItem from './favorites-item';
import { AuthorizationStatus } from '../../const';

type countFavorites = {
  count: number,
  authorizationStatus: AuthorizationStatus,
}

export default function FavoritesList({count, authorizationStatus} : countFavorites): JSX.Element {
  const arrayFavorites = [...Array(count)].map(() => <FavoritesItem key = {2}/>);
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
      {count > 0
        ?
        <section className="favorites">
          <h1 className="favorites__title">Saved listing</h1>
          <ul className="favorites__list">
            <li className="favorites__locations-items">
              <div className="favorites__locations locations locations--current">
                <div className="locations__item">
                  <a className="locations__item-link" href="#">
                    <span>Amsterdam</span>
                  </a>
                </div>
              </div>
              <div className="favorites__places">
                {arrayFavorites}
              </div>
            </li>
          </ul>
        </section>
        :
        <FavoritesEmpty/>}
      <footer className="footer container">
        <Logo />
      </footer>
    </div>
  );
}
