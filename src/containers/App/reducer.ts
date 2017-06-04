/* ------------------------------------------------------------------------------
* AppReducer
*
* The reducer takes care of our data. 
* Using actions, we can change our application state.
* To add a new action, add it to the switch statement in the reducer function.
*
* Nick Luparev nikita.luparev@gmail.com
------------------------------------------------------------------------------- */

import { fromJS } from 'immutable';
import { IAction } from '../../interfaces';

import {
  SAVE_AUTH_CREDENTIALS,
  SAVE_USER_CREDENTIALS,
  LOGOUT_USER,
  SAVE_INTENDED_PATH,
  CLEAR_INTENDED_PATH,
} from './constants';

const initialModel = fromJS({
  isLoggedIn: false,
  auth_token: '',
  username: '',
  email: '',
  isEmailConfirmed: false,
  intendedPath: '',
});

export default (state = initialModel, action: IAction) => {
  switch(action.type) {

    case SAVE_AUTH_CREDENTIALS:
      return state.merge({ auth_token: action.data.auth_token, isLoggedIn: true });

    case SAVE_USER_CREDENTIALS:
      return state.merge({ username: action.data.username, email: action.data.email });

    case LOGOUT_USER:
      return state.merge({ isLoggedIn: false, auth_token: '' });

    case SAVE_INTENDED_PATH:
      return state.set('intendedPath', action.data.path);

    case CLEAR_INTENDED_PATH:
      return state.set('intendedPath', '');

    default:
      return state;
  }
};
