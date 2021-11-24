import { configureMockStore } from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { getByKey } from '../../utils/common';
import { makeFakeHostel } from '../../utils/makeFakeHostel';
import Map from './map';

describe('Компонент: Map', () => {
  const testHostels = [...Array(3)].fill(makeFakeHostel());
  const mockStore = configureMockStore();
  const store = mockStore({
    'USER_HOVER': {
      hoverMarker: Math.random() < 0.5
        ? getByKey(testHostels, 'id')[Math.floor(Math.random() * testHostels.length)]
        : undefined,
      hoverHostel: Math.random() < 0.5
        ? getByKey(testHostels, 'id')[Math.floor(Math.random() * testHostels.length)]
        : undefined,
    },
  });
  const history = createMemoryHistory();

  it('проверка на рендер', () => {
    render(
      <Provider store = {store}>
        <Router history = {history}>
          <Map hostels = {testHostels}/>
        </Router>
      </Provider>,
    );

    expect(screen.getByTestId(/map/i)).toBeInTheDocument();
  });
});
