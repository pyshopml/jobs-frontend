/* ------------------------------------------------------------------------------
* index.js
*
* Combine all reducers in this file and export the combined reducers.
*
* Nick Luparev nikita.luparev@gmail.com
------------------------------------------------------------------------------- */
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import globalReducer from './containers/App/reducer';

export default combineReducers({
  routing: routerReducer,
  global: globalReducer,
});
