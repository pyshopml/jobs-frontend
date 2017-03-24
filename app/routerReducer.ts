/*
*  routerReducer.ts
* 
*  Since react-router doesn't use Immutable.js out of the box
*  we need to write our own custom reducer for handling router 
*  state changes which uses Immutable collection
*/
import { fromJS } from 'immutable';
import {
  LOCATION_CHANGE,
} from 'react-router-redux';

const initialState = fromJS({
  locationBeforeTransitions: null,
});

export default (state = initialState, action) => {
  if (action.type === LOCATION_CHANGE) {
    return state.set('locationBeforeTransitions', action.payload);
  }

  return state;
}