import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { makeFakeHostel, makeFakeHostelComment } from '../../utils/makeFakeHostel';
import PropertyFavorite from './property-favorite';
import PropertyInfo from './property-info';
import PropertyNeighbourhoodList from './property-neighbourhood-list';

const TEST_COMMENTS_AMOUNT = 5;
const TEST_NEARBY_HOSTELS_AMOUNT = 3;

const testNearbyHostelsProperty = [...Array(TEST_NEARBY_HOSTELS_AMOUNT)].fill(makeFakeHostel());
const testComments = Math.random() < 0.5 ? [...Array(TEST_COMMENTS_AMOUNT)].fill(makeFakeHostelComment()) : [];
const mockStore = configureMockStore();
const history = createMemoryHistory();
const store = mockStore({
  'DATA': {
    nearbyHostelsProperty: testNearbyHostelsProperty,
    commentsProperty: testComments,
  },
  'USER_PROCESS': {
    authorizationStatus: Math.random() < 0.5,
  },
  'USER_HOVER': {
    hoverMarker: Math.random() < 0.5
      ? Math.floor(Math.random() * testNearbyHostelsProperty.length)
      : undefined,
    hoverHostel: Math.random() < 0.5
      ? Math.floor(Math.random() * testNearbyHostelsProperty.length)
      : undefined,
  },
});

describe('Компонент: Property-Info', () => {

  it('проверка на правильный рендер', () => {
    const testHostel = makeFakeHostel();
    render(
      <Provider store = {store}>
        <Router history = {history}>
          <PropertyInfo hostel = {testHostel}/>
        </Router>
      </Provider>,
    );

    // eslint-disable-next-line jest/no-conditional-expect
    testHostel.is_premium && expect(screen.getByTestId('hostel-premium-status').textContent)
      .toBe('Premium');
    // eslint-disable-next-line jest/no-conditional-expect
    testHostel.is_premium && expect(screen.getByTestId('host-pro-status').textContent)
      .toBe('Pro');
    expect(screen.getByTestId('hostel-raiting').textContent).toBe(`${testHostel.rating}`);
    expect(screen.getByTestId('hostel-type').textContent).toBe(testHostel.type);
    expect(screen.getByTestId('hostel-bedrooms').textContent).toBe(`${testHostel.bedrooms} Bedrooms`);
    expect(screen.getByTestId('hostel-adults').textContent).toBe(`Max ${testHostel.max_adults} adults`);
    expect(screen.getByTestId('hostel-price').textContent).toBe(`€${testHostel.price}`);
    expect(screen.getByTestId('hostel-description').textContent).toBe(testHostel.description);
  });
});

describe('Компонент: Property-Neighbourhood-List', () => {
  it('проверка на правильный рендер', () => {
    render(
      <Provider store = {store}>
        <Router history = {history}>
          <PropertyNeighbourhoodList />
        </Router>
      </Provider>,
    );

    expect(screen.getByText('Other places in the neighbourhood')).toBeInTheDocument();
  });
});

describe('Компонент: Property-Favorite', () => {
  const testHostel = makeFakeHostel();
  it('проверка на правильный рендер', () => {
    render(
      <Provider store = {store}>
        <Router history = {history}>
          <PropertyFavorite hostel = {testHostel} />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(testHostel.title)).toBeInTheDocument();
    expect(screen.getByTestId('hostel-favorite-status').textContent)
      .toBe(testHostel.is_favorite ? 'In bookmarks' : 'To bookmarks');
  });
});
