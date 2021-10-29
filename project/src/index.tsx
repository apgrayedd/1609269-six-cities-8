import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './components/app/app';
import { AuthorizationStatus } from './const';
import {composeWithDevTools} from 'redux-devtools-extension';
import { comments } from './mocks/comments';
import { hostels } from './mocks/hostels';
import { reducer } from './store/reducer';

const Options = {
  AUTHORIZATION: AuthorizationStatus.Auth,
};

const store = createStore(reducer, composeWithDevTools());

ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
      <App
        authorizationStatus = {Options.AUTHORIZATION}
        hostels = {hostels}
        comments = {comments}
      />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
