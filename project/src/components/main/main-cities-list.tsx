import { nanoid } from '@reduxjs/toolkit';
import { Link } from 'react-router-dom';
import { Cities } from '../../const';

type cityOption = {
  city: string,
}

function MainCitiesItem({city}:cityOption): JSX.Element {
  return (
    <li className="locations__item">
      <Link className = "locations__item-link tabs__item" to = {`/main/${city.toLocaleLowerCase()}`}>
        <span>{city}</span>
      </Link>
    </li>
  );
}

export default function MainCitiesList(): JSX.Element {
  const cities = Object.values(Cities);
  return (
    <ul className="locations__list tabs__list">
      {
        cities.length > 0
          ?
          cities.map((city) => <MainCitiesItem key = {nanoid()} city = {city}/>)
          :
          ''
      }
    </ul>
  );
}
