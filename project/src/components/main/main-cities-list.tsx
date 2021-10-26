import { nanoid } from '@reduxjs/toolkit';
import { useParams } from 'react-router-dom';
import { Cities, DEFAULT_ACTIVE_CITY } from '../../const';
import MainCitiesItem from './main-cities-item';

export default function MainCitiesList(): JSX.Element {
  const cities = Object.values(Cities);
  const {activeCity} = useParams<{ activeCity: string }>();
  return (
    <ul className="locations__list tabs__list">
      {
        cities.map((city) => <MainCitiesItem activeCity = {activeCity || DEFAULT_ACTIVE_CITY} key = {nanoid()} city = {city}/>)
      }
    </ul>
  );
}
