import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { Router } from 'react-router';
import LoadingSpinner from './loading-spinner';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const store = mockStore();

describe('Компонент: Loading-Spinner', () => {

  it('проврека на правильный рендер', () => {
    render(
      <Provider store={store}>
        <Router history = {history}>
          <LoadingSpinner />
        </Router>
      </Provider>,
    );

    expect(screen.getByTestId(/loading-spinner/i)).toBeInTheDocument();
  });
});
