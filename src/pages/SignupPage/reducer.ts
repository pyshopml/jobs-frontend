import { fromJS } from 'immutable';
import {
  SIGNUP_USER_PENDING,
  SIGNUP_USER_FULFILLED,
  SIGNUP_USER_REJECTED,
} from './constants';

const initialState = fromJS({
  isLoading: false,
  message: '',
});

export default (state = initialState, action)=> {
  switch(action.type) {

    case SIGNUP_USER_PENDING:
      return state.set('isLoading', true);

    case SIGNUP_USER_FULFILLED:
      return state.set('isLoading', false);

    case SIGNUP_USER_REJECTED:
      return state.merge({ isLoading: false, message: action.payload });

    default: 
      return state;
  }
}