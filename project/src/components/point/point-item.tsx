import { useMemo, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { Hostel } from '../../types/hostel';
import PointLink from './point-link';
import { ThunkAppDispatch } from '../../types/action';
import { changeHoverMarker } from '../../store/action';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFavoritesInfo, fetchHostelAction, postFavoritesStatusAction } from '../api/api-action';
import useFavorite from '../../hooks/use-favorite';
import { getHoverHostel } from '../../store/user-hover/selectors';

type PointOptions = {
  hostel: Hostel,
};


function PointItem({hostel}: PointOptions): JSX.Element {
  const hoverId = useSelector(getHoverHostel);
  const dispatch = useDispatch();
  const postFavoriteStatus = (id: number, status: 0 | 1) =>
    (dispatch as ThunkAppDispatch)(postFavoritesStatusAction(id, status))
      .then(() => (dispatch as ThunkAppDispatch)(fetchFavoritesInfo(false)))
      .then(() => (dispatch as ThunkAppDispatch)(fetchHostelAction(false)));
  const setMarkerId = (id:number | undefined) =>
    dispatch(changeHoverMarker(id));

  const raiting = useMemo(() => Math.round(hostel.rating) * 20, [hostel.rating]);
  const [favoriteStatus, changeFavoriteStatusTemplate] = useFavorite(hostel, postFavoriteStatus);
  const favoriteClassName = `place-card__bookmark-button button ${favoriteStatus &&
    'place-card__bookmark-button--active'}`;

  const onEnterHandler = (evt: MouseEvent) => {
    evt.preventDefault();
    setMarkerId(hostel.id);
  };
  const onLeaveHandler = (evt: MouseEvent) => {
    evt.preventDefault();
    setMarkerId(undefined);
  };
  const hoverStyle = hoverId === hostel.id ? {'opacity': '0.6'} : {};

  return (
    <article className="cities__place-card place-card" onMouseEnter = {onEnterHandler}
      onMouseLeave = {onLeaveHandler} style = {hoverStyle}
    >
      {
        hostel.is_premium &&
          <div className="place-card__mark">
            <span>Premium</span>
          </div>
      }
      <PointLink id = {hostel.id} img = {hostel.preview_image}/>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{hostel.price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <button className={favoriteClassName} type="button" onClick = {changeFavoriteStatusTemplate}>
            <svg className="place-card__bookmark-icon" width={18} height={19}>
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">{favoriteStatus ? 'In bookmarks' : 'To bookmarks'}</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${raiting}%`}} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to = {`/property/${hostel.id}`}>
            {hostel.title}
          </Link>
        </h2>
        <p className="place-card__type" style = {{textTransform: 'capitalize'}}>{hostel.type}</p>
      </div>
    </article>
  );
}

export default PointItem;
