/* ------------------------------------------------------------------------------
* index.js
*
* Root React component for application
*
* Nick Luparev nikita.luparev@gmail.com
------------------------------------------------------------------------------- */
import * as React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import createRoutes from './routes';
import { configureStore } from './store';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { restoreAuthState } from './containers/App/actions';

require('./tap.plugin');

import './index.scss';

const store = configureStore(browserHistory);
const history = syncHistoryWithStore(browserHistory, store);
const routes = createRoutes(store);

const loadAuthState = () => {
  store.dispatch(restoreAuthState());
}

const Main = () => (
  <Provider store={store}>
    <MuiThemeProvider>
      <Router history={history}>
        {routes}
      </Router>
    </MuiThemeProvider>
  </Provider>
);

render(<Main />, document.getElementById('main'));
loadAuthState();

if(module.hot) {
  module.hot.accept();
}
