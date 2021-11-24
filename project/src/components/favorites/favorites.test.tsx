import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { AppRoute } from '../../const';
import FavoritesList from './favorites-list/favorites-list';
import FavoritesEmpty from './favorites-empty/favorites-empty';
import { makeFakeHostel } from '../../utils/makeFakeHostel';
import { Hostel } from '../../types/hostel';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const store = mockStore({});

describe('Компонент: Favorites-Empty', () => {
  beforeEach(() => {
    history.push(AppRoute.Favorites);
  });

  it('проврека на правильный рендер', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <FavoritesEmpty />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Save properties to narrow down search or plan your future trips./i)).toBeInTheDocument();
  });
});

describe('Компонент: Favorites-List', () => {
  beforeEach(() => {
    history.push(AppRoute.Favorites);
  });

  it('проврека на правильный рендер', () => {
    const testHostels:Hostel[] = [...Array(5)].fill(makeFakeHostel());
    render(
      <Provider store={store}>
        <Router history={history}>
          <FavoritesList favorites={testHostels} />
        </Router>
      </Provider>,
    );

    expect(screen.getByTestId(/favorites-list/i)).toBeInTheDocument();
    expect(screen.getAllByTestId(/favorites-item/i).length).toBe(testHostels.length);
  });
});
