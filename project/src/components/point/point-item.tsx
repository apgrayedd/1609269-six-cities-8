import { useMemo, MouseEvent, Dispatch } from 'react';
import { Link } from 'react-router-dom';
import { State } from '../../types/state';
import { Hostel } from '../../types/hostel';
import PointLink from './point-link';
import { Actions } from '../../types/action';
import { changeHoverMarker } from '../../store/action';
import { connect, ConnectedProps } from 'react-redux';

type PointOptions = {
  hostel: Hostel,
};

const stateToProps = ({hoverHostel}:State) => ({
  hoverId: hoverHostel,
});
const dispatchToProps = (dispatch: Dispatch<Actions>) => ({
  setMarkerId(id:number | undefined) {
    dispatch(changeHoverMarker(id));
  },
});
const connector = connect(stateToProps, dispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & PointOptions;


function PointItem({hostel, hoverId, setMarkerId}: ConnectedComponentProps): JSX.Element {
  const raiting = useMemo(() => Math.round(hostel.rating) * 20, [hostel.rating]);
  const favoriteClassName = `place-card__bookmark-button button ${hostel.is_favorite &&
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
          <button className={favoriteClassName} type="button">
            <svg className="place-card__bookmark-icon" width={18} height={19}>
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">{hostel.is_favorite ? 'In bookmarks' : 'To bookmarks'}</span>
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

export {PointItem};
export default connector(PointItem);
