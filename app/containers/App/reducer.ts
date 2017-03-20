/* ------------------------------------------------------------------------------
* AppReducer
*
* The reducer takes care of our data. 
* Using actions, we can change our application state.
* To add a new action, add it to the switch statement in the reducer function.
*
* Nick Luparev nikita.luparev@gmail.com
------------------------------------------------------------------------------- */
import postsReducer from '../PostsListContainer/reducer';
import newPostReducer from '../NewPost/reducer';
import authReducer from '../Auth/reducer';
import postDetail from '../PostDetail/reducer';
import alertReducer from '../Alert/reducer';
import LoginPageReducer from '../LoginPageContainer/reducer';
import SignupPageReducer from '../SignupPage/reducer';
import RestorePasswordPageReducer from '../RestorePasswordContainer/reducer';
import PasswordChangePage from '../PasswordChangePage/reducer';

import { Action } from '../../interfaces';

import {
  SAVE_AUTH_CREDENTIALS,
  SAVE_USER_CREDENTIALS,
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

const appReducer = (state:AppState = initialModel, action: Action): AppState => {
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

    default:
      return state;
  }
};

export default (state: any = {}, action) => ({
  app: appReducer(state.app, action),
  postDetail: postDetail(state.postDetail, action),
  posts: postsReducer(state.posts, action),
  newPost: newPostReducer(state.newPost, action),
	auth: authReducer(state.auth, action),
  alert: alertReducer(state.alert, action),
  loginPage: LoginPageReducer(state.loginPage, action),
  signupPage: SignupPageReducer(state.signupPage, action),
  restorePassword: RestorePasswordPageReducer(state.restorePassword, action),
  passwordChange: PasswordChangePage(state.passwordChange, action),
});