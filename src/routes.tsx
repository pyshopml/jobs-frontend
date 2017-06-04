import * as React from 'react';
import { last } from 'ramda';
import App from './containers/App';
import { injectAsyncReducer } from './store';
import { storeIntendedPath } from './containers/App/actions';

import vacanciesRoute from 'pages/Vacancies/route';
import vacancyDetailRoute from 'pages/VacancyDetail/route';
import newVacancyRoute from 'pages/NewVacancy/route';

import loginPageRoute from 'pages/LoginPage/route';
import signupPageRoute from 'pages/SignupPage/route';
import infoPageRoute from 'pages/InfoPage/route';
import restorePasswordRoute from 'pages/RestorePassword/route';
import confirmEmailPage from 'pages/ConfirmEmailPage/route';
import activateAccountPageRoute from 'pages/ActivateAccountPage/route';
import passwordChangeRoute from 'pages/PasswordChange/route';

import notFoundRoute from 'pages/NotFound/route';


function saveIntendedPath(path: string, store){
  store.dispatch(storeIntendedPath(path));
}

export function replaceWithNotFound(nextState, replace) {
  replace('404')
};

export function matchWhenAuthed(store){
  return function(nextState, replace) {
    const { routes } = nextState;
    let intendedPath = last(routes).path;
    saveIntendedPath(intendedPath, store);

    let state = store.getState();
    let isLoggedIn = state.get('app').get('isLoggedIn');

    if(!isLoggedIn) {
      replace('/login');
    }
  };
}

export function matchWhenNotAuthed(store){
  return function(nextState, replace) {
    let state = store.getState();
    let isLoggedIn = state.get('app').get('isLoggedIn');

    if (isLoggedIn) {
      replace('/');
    }
  };
}


export default (store) => {
  const vacanciesRoutes = [
    vacanciesRoute(store),
    newVacancyRoute(store),
    vacancyDetailRoute(store),
  ];

  const authRoutes = [
    loginPageRoute(store),
    signupPageRoute(store),
    infoPageRoute(store),
    restorePasswordRoute(store),
    confirmEmailPage(store),
    activateAccountPageRoute(store),
    activateAccountPageRoute(store),
    passwordChangeRoute(store)
  ];

  const miscRoutes = [
    notFoundRoute(store),
    {
      path: '*',
      onEnter: replaceWithNotFound
    }
  ];

  const indexRoute = {
      getComponent:(location, cb) => {
        Promise.all([
          System.import('./pages/Vacancies'),
          System.import('./pages/Vacancies/reducer')
        ]).then(([component, reducer]) => {
          injectAsyncReducer(store, 'vacancies', reducer.default);
          cb(null, component.default);
        })
      }
  };

  return [
    {
      path: '/',
      getComponent: (location, cb) => {
        cb(null, App)
      },
      indexRoute: indexRoute,
      childRoutes: [].concat(vacanciesRoutes, authRoutes, miscRoutes)
    }
  ]
};
