import * as React from 'react';
import { render } from 'react-dom';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import createRoutes from './routes';
import { configureStore } from './store';

import './tap.plugin';

import './index.scss';

export const store = configureStore(hashHistory);
const history = syncHistoryWithStore(hashHistory, store, {
  selectLocationState: state => state.get('routing').toJS(),
});
const routes = createRoutes(store);

const Main = () => (
  <Provider store={store}>
    <MuiThemeProvider>
      <Router history={history} routes={routes}/>
    </MuiThemeProvider>
  </Provider>
);

render(<Main />, document.getElementById('main'));

if(module.hot) {
  module.hot.accept();
}
