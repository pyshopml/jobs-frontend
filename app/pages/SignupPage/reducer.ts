import { fromJS } from 'immutable';
import { Action } from 'interfaces';
import {
  SUBMIT_CREDENTIALS,
  SUBMIT_CREDENTIALS_SUCCEEDED,
  SUBMIT_CREDENTIALS_FAILED,
} from './constants';

const initialState = fromJS({
  isLoading: false,
  message: '',
});

export default (state = initialState, action: Action)=> {
  switch(action.type) {

    case SUBMIT_CREDENTIALS:
      return state.set('isLoading', true);

    case SUBMIT_CREDENTIALS_SUCCEEDED:
      return state.set('isLoading', false);


    case SUBMIT_CREDENTIALS_FAILED:
      return state.merge({ isLoading: false, message: action.message });

    default: 
      return state;
  }
}