/* eslint-disable jsx-a11y/anchor-is-valid */
import FavoritesEmpty from './favorites-empty';
import FavoritesItem from './favorites-item';

type countFavorites = {
  count: number,
}

export default function FavoritesList({count} : countFavorites): JSX.Element {
  const arrayFavorites = new Array(count).fill(0).map(() => <FavoritesItem key = {2}/>);
  return (
    count > 0
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
              {/* Место для избранных */}
              {arrayFavorites}
            </div>
          </li>
        </ul>
      </section>
      :
      <FavoritesEmpty/>
  );
}
