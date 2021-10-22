/* eslint-disable @typescript-eslint/no-explicit-any */
import { nanoid } from '@reduxjs/toolkit';
import { Link } from 'react-router-dom';
import { Hostel } from '../../mocks/hostel';
import { getTitleListFromListByKey } from '../../utils/common';
import FavoritesItem from './favorites-item';

type FavoritesOptions = {
  hostels: Hostel[],
};

type FavoritesListType = {
  'key': string,
  'values': any[],
};

export default function FavoritesList ({hostels}: FavoritesOptions): JSX.Element {
  const favoritesList:FavoritesListType[] = getTitleListFromListByKey(hostels, 'city');
  const favoritesListArray = favoritesList.map((hostelInfo, i) => {
    const favoritesArray = hostelInfo.values.map((hostel) => (
      hostel.is_favorite
        ?
        <FavoritesItem key = {hostel.id} hostel = {hostel}/>
        :
        false
    ));
    return (
      favoritesArray.length > 0
        ?
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
        :
        false
    );
  });
  return (
    <ul className="favorites__list">
      {favoritesListArray}
    </ul>
  );
}
