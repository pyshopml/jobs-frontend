/* ------------------------------------------------------------------------------
* index.js
*
* Combine all reducers in this file and export the combined reducers.
*
* Nick Luparev nikita.luparev@gmail.com
------------------------------------------------------------------------------- */

import { combineReducers } from 'redux-immutable';
import routerReducer from './routerReducer';
import appReducer from './containers/App/reducer';
import alertReducer from './containers/Alert/reducer';
export default function createReducer(asyncReducers?){
  return combineReducers({
    routing: routerReducer,
    alert: alertReducer,
    app: appReducer,
    ...asyncReducers
  });
}
