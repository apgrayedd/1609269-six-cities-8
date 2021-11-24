import { MouseEvent } from 'react';
import { changeCity } from '../../../store/action';
import { useDispatch, useSelector } from 'react-redux';
import { getCity } from '../../../store/data-process/selectors';

type cityOption = {
  city: string,
}

function MainCitiesItem({city}:cityOption): JSX.Element {
  const activeCity = useSelector(getCity);
  const dispacth = useDispatch();
  const setCityTemplate = (newCity: string) =>
    dispacth(changeCity(newCity));

  const linkClassName = `locations__item-link tabs__item ${activeCity.toLowerCase() === city.toLowerCase() && 'tabs__item--active'}`;
  const setCityHandler = (evt:MouseEvent) => {
    evt.preventDefault();
    setCityTemplate(city);
  };

  return (
    <li className="locations__item">
      <a className = {linkClassName} onClick = {setCityHandler} data-testid = 'change-city-link'>
        <span>{city}</span>
      </a>
    </li>
  );
}

export default MainCitiesItem;
