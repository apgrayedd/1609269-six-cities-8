import React from 'react';
import ReactDOM from 'react-dom';
import {configureStore} from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import App from './components/app/app';
import { NameSpace, rootReducer } from './store/reducer';
import { createAPI } from './components/api/api';
import {changeAuthorizationStatus} from './store/action';
import { AuthorizationStatus } from './const';
import {
  checkAuthAction,
  fetchFavoritesInfo,
  fetchHostelAction
} from './components/api/api-action';

const api = createAPI(
  () => store.dispatch(changeAuthorizationStatus(AuthorizationStatus.NoAuth)),
);

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

store.dispatch(checkAuthAction());
store.dispatch(fetchHostelAction(true));
store.getState()[NameSpace.userProcess].authorizationStatus === AuthorizationStatus.Auth &&
  store.dispatch(fetchFavoritesInfo(true));

ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
