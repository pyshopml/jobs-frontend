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
import rootReducer from './reducers';
// import createLogger from 'redux-logger';

/*
const composeEnhancers  = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const logger = createLogger();

const routing = routerMiddleware(browserHistory);

export default function (initialState) {
  return createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(routing, thunk, logger))
  );
}
*/

export function configureStore(history, initialState = {}) {

  const composeEnhancers  = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  // const logger = createLogger();

  const enhancer = composeEnhancers(
    applyMiddleware(
      thunk,
      routerMiddleware(history),
      // logger,
    )
  );

  const store = createStore(rootReducer, initialState, enhancer);

  return store;
}