import { Action } from '../../interfaces';
import {
  LOGIN_USER,
  LOGIN_USER_SUCCEEDED,
  LOGIN_USER_FAILED,
} from './constants';


const initialState = {
  message: '',
  isLoading: false,
}

export default (state = initialState, action: Action) => {
  switch(action.type) {

    case LOGIN_USER:
      return Object.assign({}, state, { isLoading: true });

    case LOGIN_USER_SUCCEEDED:
      return Object.assign({}, state, { message: '', isLoading: false });

    case LOGIN_USER_FAILED:
      return Object.assign({}, state, { message: action.message, isLoading: false });

    case "@@router/LOCATION_CHANGE":
      return initialState;

    default:
      return state;
  }
}