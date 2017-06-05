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
