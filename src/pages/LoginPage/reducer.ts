import { fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import {
  LOGIN_USER_PENDING,
  LOGIN_USER_FULFILLED,
  LOGIN_USER_REJECTED,
} from './constants';

const initialState = fromJS({
  message: '',
  isLoading: false,
});

export default (state = initialState, action) => {
  switch(action.type) {

    case LOGIN_USER_PENDING:
      return state.set('isLoading', true);

    case LOGIN_USER_FULFILLED:
      return state.merge({ message: '', isLoading: false });

    case LOGIN_USER_REJECTED:
      return state.merge({ message: action.payload, isLoading: false });

    case LOCATION_CHANGE:
      return initialState;

    default:
      return state;
  }
}