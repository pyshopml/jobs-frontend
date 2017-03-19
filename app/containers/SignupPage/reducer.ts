import { Action } from '../../interfaces';
import { SignupModel } from './interfaces';
import {
  SUBMIT_CREDENTIALS,
  SUBMIT_CREDENTIALS_SUCCEEDED,
  SUBMIT_CREDENTIALS_FAILED,
} from './constants';

const initialState = {
  isLoading: false,
  message: '',
};

export default (state = initialState, action: Action): SignupModel => {
  switch(action.type) {

    case SUBMIT_CREDENTIALS:
      return Object.assign({}, state, { isLoading: true });


    case SUBMIT_CREDENTIALS_SUCCEEDED:
      return Object.assign({}, state, { isLoading: false });


    case SUBMIT_CREDENTIALS_FAILED:
      return Object.assign({}, state, { isLoading: false, message: action.message });

    default: 
      return state;
  }
}