import { nanoid } from '@reduxjs/toolkit';
import { Cities } from '../../const';
import MainCitiesItem from './main-cities-item';


export default function MainCitiesList(): JSX.Element {
  const cities = Object.values(Cities);
  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {
          cities.map((city) => <MainCitiesItem  key = {nanoid()} city = {city}/>)
        }
      </ul>
    </section>
  );
}
