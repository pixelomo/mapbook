import React from "react";
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './containers/App';
require('./index.css'); 

render(
  <AppContainer>
    <App />
  </AppContainer>,
  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept('./containers/App', () => {
    const NewRoot = require('./containers/App').default;
    render(
      <AppContainer>
        <NewRoot />
      </AppContainer>,
      document.getElementById('app')
    );
  });
}