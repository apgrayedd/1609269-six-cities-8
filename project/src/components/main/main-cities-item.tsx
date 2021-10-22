import { Link } from 'react-router-dom';

type cityOption = {
  city: string,
  activeCity: string,
}

export default function MainCitiesItem({city, activeCity}:cityOption): JSX.Element {
  const linkClassName = `locations__item-link tabs__item ${activeCity.toLowerCase() === city.toLowerCase() ? 'tabs__item--active' : ''}`;
  return (
    <li className="locations__item">
      <Link className = {linkClassName} to = {`/main/${city.toLocaleLowerCase()}`}>
        <span>{city}</span>
      </Link>
    </li>
  );
}
