/* eslint-disable semi */
/* eslint-disable no-console */
import { useState } from 'react';
import { Hostel } from '../types/hostel';

export default function useFavorite(
  hostel:Hostel,
  postFavoriteStatus:(id: number, status: 0 | 1, onError: () => void) => void,
):[boolean, () => void] {
  const [favoriteStatus, setFavoriteStatus] = useState<boolean>(hostel.is_favorite);

  const handleFavoriteStatusChange = () => {
    setFavoriteStatus(!favoriteStatus);
    postFavoriteStatus(
      hostel.id, (!favoriteStatus) ? 1 : 0,
      () => setFavoriteStatus(favoriteStatus),
    );
  };

  return[favoriteStatus,  handleFavoriteStatusChange];
}
