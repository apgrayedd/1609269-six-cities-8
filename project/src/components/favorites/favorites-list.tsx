import { nanoid } from '@reduxjs/toolkit';
import { connect, ConnectedProps } from 'react-redux';
import { Link } from 'react-router-dom';
import { Hostel } from '../../types/hostel';
import { State } from '../../types/state';
import { getTitleList } from '../../utils/common';
import FavoritesItem from './favorites-item';

type FavoritesListType = {
  'key': string,
  'values': Hostel[],
};

const stateToProps = ({filteredHostels, authorizationStatus}:State) => ({
  filteredHostels,
  authorizationStatus,
});
const connector = connect(stateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

function FavoritesList ({filteredHostels}: PropsFromRedux): JSX.Element {
  const favoritesList:FavoritesListType[] = getTitleList(filteredHostels, 'city');
  const favoritesListArray = favoritesList.map((hostelInfo) => {
    const favoritesArray = hostelInfo.values.map((hostel) => (
      hostel.is_favorite &&
        <FavoritesItem key = {hostel.id} hostel = {hostel}/>
    ));
    return (
      <li className="favorites__locations-items" key = {nanoid()}>
        <div className="favorites__locations locations locations--current">
          <div className="locations__item">
            <Link to = {`/main/${hostelInfo.key.toLocaleLowerCase()}`} className = "locations__item-link">
              <span>{hostelInfo.key}</span>
            </Link>
          </div>
        </div>
        <div className = 'favorites__places'>
          {favoritesArray}
        </div>
      </li>
    );
  });
  return (
    <ul className="favorites__list">
      {favoritesListArray}
    </ul>
  );
}

export {FavoritesList};
export default connector(FavoritesList);
