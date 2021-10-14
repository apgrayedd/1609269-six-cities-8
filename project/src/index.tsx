import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { AuthorizationStatus } from './const';

const Options = {
  COUNT: 5,
  AUTHORIZATION: AuthorizationStatus.NoAuth,
};

ReactDOM.render(
  <React.StrictMode>
    <App
      count = {Options.COUNT}
      authorizationStatus = {Options.AUTHORIZATION}
    />
  </React.StrictMode>,
  document.getElementById('root'));
