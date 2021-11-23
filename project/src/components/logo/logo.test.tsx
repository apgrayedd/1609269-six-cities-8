import { configureMockStore } from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { AppRoute } from '../../const';
import Logo from './logo';

describe('Компонент: Logo', () => {
  const mockStore = configureMockStore();
  const history = createMemoryHistory();
  const store = mockStore();

  it('проверка на рендер', () => {
    history.push(AppRoute.SignIn);

    render(
      <Provider store = {store}>
        <Router history = {history}>
          <Logo />
        </Router>
      </Provider>,
    );

    expect(screen.getByTestId('link')).toBeInTheDocument();
  });

  it('проверка на редирект на главную страницу', () => {
    history.push(AppRoute.SignIn);

    render(
      <Provider store = {store}>
        <Router history = {history}>
          <Logo />
        </Router>
      </Provider>,
    );

    userEvent.click(screen.getByTestId('link'));
    expect(history.location.pathname).toBe('/');
  });
});
