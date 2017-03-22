/* ------------------------------------------------------------------------------
* index.js
*
* Root React component for application
*
* Nick Luparev nikita.luparev@gmail.com
------------------------------------------------------------------------------- */
import * as React from 'react';
import { render } from 'react-dom';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import createRoutes from './routes';
import { configureStore } from './store';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { restoreAuthState } from './containers/App/actions';

import PreRunLoading from './containers/PreRunLoading';

require('./tap.plugin');

import './index.scss';

const store = configureStore(hashHistory);
const history = syncHistoryWithStore(hashHistory, store);
const routes = createRoutes(store);

const loadAuthState = () => {
  store.dispatch(restoreAuthState());
}

loadAuthState();

const Main = () => (
  <Provider store={store}>
    <MuiThemeProvider>
      <PreRunLoading>
        <Router history={history}>
          {routes}
        </Router>
      </PreRunLoading>
    </MuiThemeProvider>
  </Provider>
);

render(<Main />, document.getElementById('main'));

if(module.hot) {
  module.hot.accept();
}
