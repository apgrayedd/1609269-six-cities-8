import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { AuthorizationStatus } from './const';
import { hostels } from './mocks/hostels';

const Options = {
  COUNT: 5,
  AUTHORIZATION: AuthorizationStatus.Auth,
};

ReactDOM.render(
  <React.StrictMode>
    <App
      count = {Options.COUNT}
      authorizationStatus = {Options.AUTHORIZATION}
      hostels = {hostels}
    />
  </React.StrictMode>,
  document.getElementById('root'));
