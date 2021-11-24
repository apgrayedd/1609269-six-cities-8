import { nanoid } from '@reduxjs/toolkit';
import { Cities } from '../../../const';
import MainCitiesItem from '../main-cities-item/main-cities-item';


export default function MainCitiesList(): JSX.Element {
  const cities = Object.values(Cities);
  return (
    <section className="locations container" data-testid = 'main-cities-list'>
      <ul className="locations__list tabs__list">
        {
          cities.map((city) => <MainCitiesItem  key = {nanoid()} city = {city}/>)
        }
      </ul>
    </section>
  );
}
