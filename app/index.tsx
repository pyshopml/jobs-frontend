/* ------------------------------------------------------------------------------
* index.js
*
* Root React component for application
*
* Nick Luparev nikita.luparev@gmail.com
------------------------------------------------------------------------------- */
import React from 'react';
import { render } from 'react-dom';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import createRoutes from './routes';
import configStore from './store';

import './index.scss';

const store = configStore({});
const history = syncHistoryWithStore(hashHistory, store);
const routes = createRoutes(store);

const Main = () => (
  <Provider store={store}>
    <Router history={history}>
      {routes}
    </Router>
  </Provider>
);

render(<Main />, document.getElementById('main'));

if(module.hot) {
  module.hot.accept();
}
