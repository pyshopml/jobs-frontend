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
} from './constants';

interface AppState {
  isLoggedIn: boolean;
  auth_token: string;
  username: string;
  email: string;
  isEmailConfirmed: boolean;
}

const initialModel = {
  isLoggedIn: false,
  auth_token: '',
  username: '',
  email: '',
  isEmailConfirmed: false,
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

    case LOGOUT_USER:
      return Object.assign({}, state, { isLoggedIn: false, auth_token: '' });

    default:
      return state;
  }
};
