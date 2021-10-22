import { nanoid } from '@reduxjs/toolkit';
import { useParams } from 'react-router-dom';
import { Cities } from '../../const';
import MainCitiesItem from './main-cities-item';

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
