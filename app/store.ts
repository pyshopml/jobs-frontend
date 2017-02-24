/* ------------------------------------------------------------------------------
* store.js
*
* store's configuration file
*
* Nick Luparev nikita.luparev@gmail.com
------------------------------------------------------------------------------- */

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';
import rootReducer from './reducers';

const composeEnhancers =  compose;
const routing = routerMiddleware(browserHistory);

import createLogger from 'redux-logger';
const logger = createLogger();

export default function (initialState) {
  return createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(routing, thunk, logger))
  );
}
