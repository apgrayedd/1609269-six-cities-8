import { configureMockStore } from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { Cities } from '../../const';
import { makeFakeHostel } from '../../utils/makeFakeHostel';
import Main from './main';
import MainCitiesItem from './main-cities-item/main-cities-item';
import MainCitiesList from './main-cities-list/main-cities-list';
import MainEmpty from './main-empty/main-empty';

const mockStore = configureMockStore();
const history = createMemoryHistory();
describe('Компонент: Main', () => {
  const testHostels = [...Array(10)].fill(makeFakeHostel());
  const testCity =  Object.values(Cities)[Math.floor(Math.random() * Object.values(Cities).length)];
  const store = mockStore({
    'DATA': {
      city: testCity,
      filteredHostels: testHostels.filter((hostel) =>
        hostel.city.name.toLowerCase() === testCity.toLowerCase()),
    },
    'USER_PROCESS': {
      authorizationStatus: Math.random() < 0.5,
    },
  });
  it('проврека на рендер', () => {
    render(
      <Provider store ={store}>
        <Router history = {history}>
          <Main />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Cities/i)).toBeInTheDocument();
  });
});

describe('Компонент: Main-Empty', () => {
  it('проврека на рендер', () => {
    render(
      <MainEmpty />,
    );

    expect(screen.getByText(/We could not find any property available at the moment in Dusseldorf/i)).toBeInTheDocument();
  });
});

describe('Компонент: Main-Cities-List', () => {
  const testCity = Object.values(Cities)[Math.floor(Math.random() * Object.values(Cities).length)];
  const store = mockStore({
    'DATA': {
      city: testCity,
    },
  });
  it('проврека на рендер', () => {
    render(
      <Provider store = {store}>
        <MainCitiesList />
      </Provider>,
    );

    expect(screen.getByTestId(/main-cities-list/i)).toBeInTheDocument();
  });
});

describe('Компонент: Main-Cities-Item', () => {
  const testActiveCity = Object.values(Cities)[Math.floor(Math.random() * Object.values(Cities).length)];
  const testCity = Object.values(Cities)[Math.floor(Math.random() * Object.values(Cities).length)];
  const store = mockStore({
    'DATA': {
      city: testActiveCity,
    },
  });
  it('проврека на рендер', () => {
    render(
      <Provider store = {store}>
        <MainCitiesItem city = {testCity}/>
      </Provider>,
    );

    expect(screen.getByText(testCity)).toBeInTheDocument();
  });
});
