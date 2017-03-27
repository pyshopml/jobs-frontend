/* ------------------------------------------------------------------------------
* index.js
*
* Combine all reducers in this file and export the combined reducers.
*
* Nick Luparev nikita.luparev@gmail.com
------------------------------------------------------------------------------- */

import { combineReducers } from 'redux-immutable';
import routerReducer from './routerReducer';
import appReducer from './containers/App/reducer';
import newPostReducer from './containers/NewPost/reducer';
import postDetail from './containers/PostDetail/reducer';
import postsReducer from './pages/Vacancies/reducer';
import alertReducer from './containers/Alert/reducer';
import LoginPageReducer from './containers/LoginPage/reducer';
import RestorePasswordPageReducer from './containers/RestorePasswordContainer/reducer';
import PasswordChangePage from './containers/PasswordChangePage/reducer';
import AccountActivationReducer from './containers/ActivateAccountPage/reducer';
import SignupPageReducer from './pages/SignupPage/reducer';

export default combineReducers({
  routing: routerReducer,
  app: appReducer,
  postDetail: postDetail,
  posts: postsReducer,
  newPost: newPostReducer,
  alert: alertReducer,
  loginPage: LoginPageReducer,
  signupPage: SignupPageReducer,
  restorePassword: RestorePasswordPageReducer,
  passwordChange: PasswordChangePage,
  accountActivation: AccountActivationReducer,
});
