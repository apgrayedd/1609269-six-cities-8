import { nanoid } from '@reduxjs/toolkit';
import { Link } from 'react-router-dom';
import { Hostel } from '../../types/hostel';
import { getTitleList } from '../../utils/common';
import FavoritesItem from './favorites-item';

type FavoritesOptions = {
  hostels: Hostel[],
};

type FavoritesListType = {
  'key': string,
  'values': Hostel[],
};

export default function FavoritesList ({hostels}: FavoritesOptions): JSX.Element {
  const favoritesList:FavoritesListType[] = getTitleList(hostels, 'city');
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
