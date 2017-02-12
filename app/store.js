/* ------------------------------------------------------------------------------
* store.js
*
* store's configuration file
*
* Nick Luparev nikita.luparev@gmail.com
------------------------------------------------------------------------------- */

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import { hashHistory } from 'react-router';
import rootReducer from './reducers';

const routing = routerMiddleware(hashHistory);

export default function (initialState) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(routing, thunk),
  );
}
