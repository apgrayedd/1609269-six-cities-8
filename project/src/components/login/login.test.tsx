import {render, screen, waitFor} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router';
import Login from './login';
import { APIRoute, AppRoute } from '../../const';
import MockAdapter from 'axios-mock-adapter';
import { createAPI } from '../api/api';
import thunk from 'redux-thunk';
import { State } from '../../types/state';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const store = mockStore();

describe('Компонент: Login', () => {
  beforeEach(() => {
    history.push(AppRoute.SignIn);
  });
  it('проврека на правильный рендер', () => {
    render(
      <Provider store={store}>
        <Router history = {history}>
          <Login />
        </Router>
      </Provider>,
    );

    expect(screen.getAllByText(/Sign in/i).length).toBe(2);
  });

  it('проврека на заполнение полей ввода', () => {
    render(
      <Provider store={store}>
        <Router history = {history}>
          <Login />
        </Router>
      </Provider>,
    );

    userEvent.type(screen.getByTestId('email'), 'test@mail.ru');
    userEvent.type(screen.getByTestId('password'), '123456');
    expect(screen.getByDisplayValue(/test@mail.ru/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/123456/i)).toBeInTheDocument();
  });

  it('проврека на редирект на главную страницу', async () => {
    const onFakeUnauthorized = jest.fn();
    const api = createAPI(onFakeUnauthorized());
    const mockAPI = new MockAdapter(api);
    const middlewares = [thunk.withExtraArgument(api)];
    const mockStoreWithMiddleWares = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);
    mockAPI.onPost(APIRoute.Login).reply(200, '12345');

    render(
      <Provider store={mockStoreWithMiddleWares()}>
        <Router history = {history}>
          <Login />
        </Router>
      </Provider>,
    );
    userEvent.type(screen.getByTestId('email'), 'test@mail.ru');
    userEvent.type(screen.getByTestId('password'), '123456');
    userEvent.click(screen.getByTestId('buttonSignIn'));
    await waitFor(() => expect(mockAPI.history.post.length).toBe(1));
    expect(history.location.pathname).toBe('/');
  });
});

