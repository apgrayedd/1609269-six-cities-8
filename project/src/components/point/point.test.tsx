import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { Cities } from '../../const';
import { Hostel } from '../../types/hostel';
import { capitalizeText } from '../../utils/common';
import { makeFakeHostel } from '../../utils/makeFakeHostel';
import PointItem from './point-item';
import PointList from './point-list';

const testHostels:Hostel[] = [...Array(5)].fill(makeFakeHostel());
const testCity =  Object.values(Cities)[Math.floor(Math.random() * Object.values(Cities).length)];
const mockStore = configureMockStore();
const store = mockStore({
  'DATA': {
    city: testCity,
    filteredHostels: testHostels,
  },
  'USER_HOVER': {
    hoverHostel: undefined,
    hoverMarker: undefined,
  },
});
const history = createMemoryHistory();

describe('Компонент: Point-List', () => {

  it('проверка на рендер', () => {
    render(
      <Provider store = {store}>
        <Router history = {history}>
          <PointList />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(`${testHostels.length} places to stay in ${capitalizeText(testCity)}`)).toBeInTheDocument();
  });
});

describe('Компонент: Point-Item', () => {
  const testHostel = testHostels[Math.floor(Math.random() * testHostels.length)];

  it('проверка на рендер', () => {
    render(
      <Provider store = {store}>
        <Router history = {history}>
          <PointItem hostel = {testHostel}/>
        </Router>
      </Provider>,
    );

    // eslint-disable-next-line jest/no-conditional-expect
    testHostel.is_favorite && expect(screen.getByText(/Premium/i)).toBeInTheDocument();
    expect(screen.getByText(`€${testHostel.price}`)).toBeInTheDocument();
    expect(screen.getByText('/ night')).toBeInTheDocument();
    expect(screen.getByText(testHostel.title)).toBeInTheDocument();
    expect(screen.getByText(testHostel.type)).toBeInTheDocument();
    expect(screen.getByTestId('favorite-button').textContent)
      .toBe(testHostel.is_favorite ? 'In bookmarks' : 'To bookmarks');
  });

  it('проверка на редирект на страинцу отеля', () => {
    history.push('/');
    render(
      <Provider store = {store}>
        <Router history = {history}>
          <PointItem hostel = {testHostel}/>
        </Router>
      </Provider>,
    );

    userEvent.click(screen.getByRole('img'));
    expect(history.location.pathname).toBe(`/property/${testHostel.id}`);

    history.push('/');

    userEvent.click(screen.getByText(testHostel.title));
    expect(history.location.pathname).toBe(`/property/${testHostel.id}`);
  });
});
