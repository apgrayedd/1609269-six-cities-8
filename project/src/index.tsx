import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

const Options = {
  COUNT: 1,
};

ReactDOM.render(
  <React.StrictMode>
    <App
      count = {Options.COUNT}
    />
  </React.StrictMode>,
  document.getElementById('root'));
