import { fromJS } from 'immutable';
import { getUserFromCookie } from "tools/user";
import { LOGIN_USER_FULFILLED } from 'pages/LoginPage/constants';
import {
  LOGOUT_USER,
  SAVE_INTENDED_PATH,
  CLEAR_INTENDED_PATH,
} from './constants';

const savedUser = getUserFromCookie();

const initialModel = fromJS({
  isLoggedIn: savedUser ? true : false,
  user: savedUser || null,
  intendedPath: '',
});

export default (state = initialModel, action) => {
  switch(action.type) {

    case LOGIN_USER_FULFILLED:
      return state.set('isLoggedIn', true)
                  .set('user', action.payload)

    case LOGOUT_USER:
      return state.merge({ isLoggedIn: false, user: null });

    case SAVE_INTENDED_PATH:
      return state.set('intendedPath', action.data.path);

    case CLEAR_INTENDED_PATH:
      return state.set('intendedPath', '');

    default:
      return state;
  }
};
