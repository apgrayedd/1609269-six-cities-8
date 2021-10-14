/* eslint-disable jsx-a11y/img-redundant-alt */
import { Link } from 'react-router-dom';
// import { AppRoute } from '../../const';

type linkOptions = {
  id: number,
};

export default function PointLink({id}: linkOptions): JSX.Element {
  return (
    <Link to = {`/property/${id}`}>
      <img className="place-card__image" src="img/apartment-01.jpg"
        alt="Place image" width={260} height={200}
      />
    </Link>
  );
}
