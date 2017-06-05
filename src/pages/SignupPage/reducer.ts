import { fromJS } from 'immutable';
import {
  SUBMIT_CREDENTIALS_PENDING,
  SUBMIT_CREDENTIALS_FULFILLED,
  SUBMIT_CREDENTIALS_REJECTED,
} from './constants';

const initialState = fromJS({
  isLoading: false,
  message: '',
});

export default (state = initialState, action)=> {
  switch(action.type) {

    case SUBMIT_CREDENTIALS_PENDING:
      return state.set('isLoading', true);

    case SUBMIT_CREDENTIALS_FULFILLED:
      return state.set('isLoading', false);

    case SUBMIT_CREDENTIALS_REJECTED:
      return state.merge({ isLoading: false, message: action.payload });

    default: 
      return state;
  }
}