/* ------------------------------------------------------------------------------
* AppReducer
*
* The reducer takes care of our data. 
* Using actions, we can change our application state.
* To add a new action, add it to the switch statement in the reducer function.
*
* Nick Luparev nikita.luparev@gmail.com
------------------------------------------------------------------------------- */
import { Action } from '../../interfaces';

import {
  SAVE_AUTH_CREDENTIALS,
  SAVE_USER_CREDENTIALS,
  LOGOUT_USER,
  SAVE_INTENDED_PATH,
  CLEAR_INTENDED_PATH,
  RESTORING_AUTH_STATE,
  RESTORING_AUTH_STATE_COMPLETE
} from './constants';

interface AppState {
  isLoggedIn: boolean;
  auth_token: string;
  username: string;
  email: string;
  isEmailConfirmed: boolean;
  intendedPath: string;
  isAuthStateRestoring: boolean;
}

const initialModel = {
  isLoggedIn: false,
  auth_token: '',
  username: '',
  email: '',
  isEmailConfirmed: false,
  intendedPath: '',
  isAuthStateRestoring: false
};

export default (state:AppState = initialModel, action: Action): AppState => {
  switch(action.type) {

    case SAVE_AUTH_CREDENTIALS:
      return Object.assign(
        {},
        state,
        { auth_token: action.data.auth_token, isLoggedIn: true }
      );

    case SAVE_USER_CREDENTIALS:
      return Object.assign(
        {},
        state,
        { username: action.data.username, email: action.data.email }
      );
    case RESTORING_AUTH_STATE:
      return Object.assign(
        {},
        state,
        { isAuthStateRestoring: true }
      );
    case RESTORING_AUTH_STATE_COMPLETE:
      return Object.assign(
        {},
        state,
        { isAuthStateRestoring: false }
      );

    case LOGOUT_USER:
      return Object.assign({}, state, { isLoggedIn: false, auth_token: '' });

    case SAVE_INTENDED_PATH:
      return Object.assign({}, state, { intendedPath: action.data.path });

    case CLEAR_INTENDED_PATH:
      return Object.assign({}, state, { intendedPath: '' });

    default:
      return state;
  }
};
