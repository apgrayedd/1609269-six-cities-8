/* eslint-disable jsx-a11y/img-redundant-alt */
import { Link } from 'react-router-dom';

type linkOptions = {
  id: number,
  imgLinlk: string,
};

export default function PointLink({id, imgLinlk}: linkOptions): JSX.Element {
  return (
    <Link to = {`/property/${id}`}>
      <img className="place-card__image" src={imgLinlk}
        alt="Place image" width={260} height={200}
      />
    </Link>
  );
}
