import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import Page404 from './page-404';

describe('Компонент: Page-404', () => {
  const mockStore = configureMockStore();
  const history = createMemoryHistory();
  const store = mockStore({
    'USER_PROCCES': {
      authorizationStatus: Math.random() < 0.5,
    },
  });
  it('проверка на рендер', () => {
    render(
      <Provider store = {store}>
        <Router history = {history}>
          <Page404 />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Ошибка 404/i)).toBeInTheDocument();
    expect(screen.getByText(/Страница не была найдена :'\(/)).toBeInTheDocument();
  });

  it('проверка на редирект на главную страницу', () => {
    history.push('/test');
    render(
      <Provider store = {store}>
        <Router history = {history}>
          <Page404 />
        </Router>
      </Provider>,
    );

    userEvent.click(screen.getByText(/Ошибка 404/i));
    expect(history.location.pathname).toBe('/');

    history.push('/test');

    userEvent.click(screen.getByText(/Страница не была найдена :'\(/));
    expect(history.location.pathname).toBe('/');
  });
});
