import { useDispatch } from 'react-redux';
import useFavorite from '../../hooks/use-favorite';
import { ThunkAppDispatch } from '../../types/action';
import { Hostel } from '../../types/hostel';
import { fetchFavoritesInfo, fetchHostelAction, postFavoritesStatusAction } from '../api/api-action';

type PropertyOption = {
  hostel: Hostel;
};

function PropertyFavorite({hostel}:PropertyOption):JSX.Element {
  const dispatch = useDispatch();
  const postFavoriteStatus = (id: number, status: 0 | 1) =>
    (dispatch as ThunkAppDispatch)(postFavoritesStatusAction(id, status))
      .then(() => (dispatch as ThunkAppDispatch)(fetchFavoritesInfo(false)))
      .then(() => (dispatch as ThunkAppDispatch)(fetchHostelAction(false)));

  const [favoriteStatus, changeFavoriteStatusTemplate] = useFavorite(hostel, postFavoriteStatus);
  const favoriteClassName = `property__bookmark-button button ${favoriteStatus &&
    'property__bookmark-button--active'}`;

  return (
    <div className="property__name-wrapper">
      <h1 className="property__name">
        {hostel.title}
      </h1>
      <button className={favoriteClassName} type="button" onClick = {changeFavoriteStatusTemplate}>
        <svg className="property__bookmark-icon" width={31} height={33}>
          <use xlinkHref="#icon-bookmark" />
        </svg>
        <span className="visually-hidden">{favoriteStatus ? 'In bookmarks' : 'To bookmarks'}</span>
      </button>
    </div>
  );
}

export default PropertyFavorite;
