import { MouseEvent } from 'react';
import { changeCity } from '../../store/action';
import { State } from '../../types/state';
import { Dispatch } from 'redux';
import { connect,ConnectedProps } from 'react-redux';
import { Actions } from '../../types/action';

type cityOption = {
  city: string,
  activeCity: string,
}
const statesToProps = ({city}: State) => ({
  activeCity: city,
});
const dispatchToProps = (dispacth: Dispatch<Actions>) => ({
  setCity(city:string) {
    dispacth(changeCity(city));
  },
});
const connector = connect(statesToProps, dispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & cityOption;

function MainCitiesItem({city, activeCity, setCity}:ConnectedComponentProps): JSX.Element {
  const linkClassName = `locations__item-link tabs__item ${activeCity.toLowerCase() === city.toLowerCase() && 'tabs__item--active'}`;
  const setCityHandler = (evt:MouseEvent) => {
    evt.preventDefault();
    setCity(city);
  };
  return (
    <li className="locations__item">
      <a className = {linkClassName} onClick = {setCityHandler}>
        <span>{city}</span>
      </a>
    </li>
  );
}

export {MainCitiesItem};
export default connector(MainCitiesItem);
