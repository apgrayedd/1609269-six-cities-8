/* eslint-disable no-console */
import { nanoid } from '@reduxjs/toolkit';
import { Link,useParams } from 'react-router-dom';
import { Cities } from '../../const';

type cityOption = {
  city: string,
  activeCity: string,
}

function MainCitiesItem({city, activeCity}:cityOption): JSX.Element {
  const linkClassName = `locations__item-link tabs__item ${activeCity.toLowerCase() === city.toLowerCase() ? 'tabs__item--active' : ''}`;
  console.log(linkClassName);
  return (
    <li className="locations__item">
      <Link className = {linkClassName} to = {`/main/${city.toLocaleLowerCase()}`}>
        <span>{city}</span>
      </Link>
    </li>
  );
}

export default function MainCitiesList(): JSX.Element {
  const cities = Object.values(Cities);
  const {activeCity} = useParams<{ activeCity: string }>();
  return (
    <ul className="locations__list tabs__list">
      {
        cities.length > 0
          ?
          cities.map((city) => <MainCitiesItem activeCity = {activeCity ? activeCity : 'Amsterdam'} key = {nanoid()} city = {city}/>)
          :
          ''
      }
    </ul>
  );
}
