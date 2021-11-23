import { useMemo} from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import useFavorite from '../../../hooks/use-favorite';
import { ThunkAppDispatch } from '../../../types/action';
import { Hostel } from '../../../types/hostel';
import { fetchFavoritesInfo, fetchHostelAction, postFavoritesStatusAction } from '../../api/api-action';

type HostelOptions = {
  hostel: Hostel,
};

function FavoritesItem({hostel}: HostelOptions): JSX.Element {
  const dispatch = useDispatch();
  const postFavoriteStatus = (id:number, status: 0 | 1) =>
    (dispatch as ThunkAppDispatch)(postFavoritesStatusAction(id, status))
      .then(() => (dispatch as ThunkAppDispatch)(fetchFavoritesInfo(false)))
      .then(() => (dispatch as ThunkAppDispatch)(fetchHostelAction(false)));

  const [statusFavorite, changeFavoriteStatusTemplate] = useFavorite(hostel, postFavoriteStatus);
  const rating = useMemo(() => Math.round(hostel.rating) * 20, [hostel.rating]);
  const favoriteClassName = `place-card__bookmark-button button ${statusFavorite &&
    'place-card__bookmark-button--active'}`;

  return (
    <article className="favorites__card place-card" data-testid = 'favorites-item'>
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <Link to = {`/property/${hostel.id}`}>
          <img className ="place-card__image" src={hostel.preview_image} width="150" height="110" alt={hostel.title}/>
        </Link>
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{hostel.price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <button
            className={favoriteClassName}
            type="button"
            onClick = {changeFavoriteStatusTemplate}
          >
            <svg className="place-card__bookmark-icon" width={18} height={19}>
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${rating}%`}} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to = {`/property/${hostel.id}`}>
            {hostel.title}
          </Link>
        </h2>
        <p className="place-card__type" style={{textTransform: 'capitalize'}}>{hostel.type}</p>
      </div>
    </article>
  );
}

export default FavoritesItem;
