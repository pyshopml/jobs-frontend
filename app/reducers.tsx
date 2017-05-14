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
import vacanciesReducer from './pages/Vacancies/reducer';
import newVacancyReducer from './pages/NewVacancy/reducer';
import vacancyDetail from './pages/VacancyDetail/reducer';
import alertReducer from './containers/Alert/reducer';
import LoginPageReducer from './pages/LoginPage/reducer';
import signupPageReducer from './pages/SignupPage/reducer';
import restorePasswordPageReducer from './pages/RestorePassword/reducer';
import passwordChangePage from './pages/PasswordChange/reducer';
import accountActivationReducer from './pages/ActivateAccountPage/reducer';

export default combineReducers({
  routing: routerReducer,
  app: appReducer,
  vacancyDetail: vacancyDetail,
  vacancies: vacanciesReducer,
  newVacancy: newVacancyReducer,
  alert: alertReducer,
  loginPage: LoginPageReducer,
  signupPage: signupPageReducer,
  restorePassword: restorePasswordPageReducer,
  passwordChange: passwordChangePage,
  accountActivation: accountActivationReducer,
});
