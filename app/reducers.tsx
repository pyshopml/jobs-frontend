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
import postsReducer from './pages/Vacancies/reducer';
import NewVacancyReducer from './pages/NewVacancy/reducer';
import postDetail from './pages/PostDetail/reducer';
import alertReducer from './containers/Alert/reducer';
import LoginPageReducer from './pages/LoginPage/reducer';
import SignupPageReducer from './pages/SignupPage/reducer';
import RestorePasswordPageReducer from './pages/RestorePassword/reducer';
import PasswordChangePage from './pages/PasswordChange/reducer';
import AccountActivationReducer from './pages/ActivateAccountPage/reducer';

export default combineReducers({
  routing: routerReducer,
  app: appReducer,
  postDetail: postDetail,
  posts: postsReducer,
  newVacancy: NewVacancyReducer,
  alert: alertReducer,
  loginPage: LoginPageReducer,
  signupPage: SignupPageReducer,
  restorePassword: RestorePasswordPageReducer,
  passwordChange: PasswordChangePage,
  accountActivation: AccountActivationReducer,
});
