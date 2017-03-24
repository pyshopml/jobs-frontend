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
import * as Immutable from 'immutable';
import rootReducer from './reducers';

// Since Store's state is represented now using immutable collection 
// from Immutable.js its initial value should be Immutable collection
export function configureStore(history, initialState = Immutable.Map()) {

  const composeEnhancers  = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const enhancer = composeEnhancers(
    applyMiddleware(
      thunk,
      routerMiddleware(history),
    )
  );

  const store = createStore(rootReducer, initialState, enhancer);

  return store;
}