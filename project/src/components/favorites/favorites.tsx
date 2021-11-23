import Logo from '../logo/logo';
import FavoritesEmpty from './favorites-empty/favorites-empty';
import FavoritesList from './favorites-list/favorites-list';
import Header from '../header/header';
import { useSelector } from 'react-redux';
import { getFavorites } from '../../store/user-process/selectors';

function Favorites(): JSX.Element {
  const favorites = useSelector(getFavorites);

  return (
    <div className = 'page'>
      <Header />
      <div className="page__favorites-container container">
        {
          favorites.length > 0
            ?
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <FavoritesList favorites = {favorites}/>
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

export default Favorites;
