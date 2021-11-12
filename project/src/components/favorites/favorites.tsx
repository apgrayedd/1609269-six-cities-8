import { State } from '../../types/state';
import Logo from '../logo/logo';
import FavoritesEmpty from './favorites-empty';
import FavoritesList from './favorites-list';
import Header from '../header/header';
import { connect, ConnectedProps } from 'react-redux';
import { useState } from 'react';
import { getFavorites } from '../..';
import LoadingSpinner from '../loading-spinner/loading-spinner';

const stateToProps = ({favorites}:State) => ({
  favorites,
});
const connector = connect(stateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

function Favorites({favorites}: PropsFromRedux): JSX.Element {
  const [startLoading, setStartLoading] = useState<boolean>(false);
  const [endLoading, setEndLoading] = useState<boolean>(false);

  if (!endLoading) {
    if(!startLoading) {
      setStartLoading(true);
      getFavorites(() => setEndLoading(true));
    }

    return <LoadingSpinner />;
  }

  return (
    <div className = 'page'>
      <Header />
      <div className="page__favorites-container container">
        {
          favorites.length > 0
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
