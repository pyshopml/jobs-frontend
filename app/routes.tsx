import * as React from 'react';
import { last } from 'ramda';
import App from './containers/App';
import { injectAsyncReducer } from './store';
import { storeIntendedPath } from './containers/App/actions';

import { push } from 'react-router-redux';

export default (store) => {

  const saveIntendedPath = (path: string) => {
    store.dispatch(storeIntendedPath(path));
  }

  const isLogout = (nextState, replace) => {
    let state = store.getState();
    let isLoggedIn = state.get('app').get('isLoggedIn');
    
    if (isLoggedIn) {
      store.dispatch(push('/'));
    }
  };

  const MatchWhenAuthed = (nextState, replace) => {
    const { routes } = nextState;
    let intendedPath = last(routes).path;
    saveIntendedPath(intendedPath);

    let state = store.getState();
    let isLoggedIn = state.get('app').get('isLoggedIn');

    if(!isLoggedIn) {
      store.dispatch(push('/login'));
    }
  };

  const vacanciesRoutes = [
    {
      path: 'vacancies',
      getComponent:(location, cb) => {
        Promise.all([
          System.import('./pages/Vacancies'),
          System.import('./pages/Vacancies/reducer')
        ]).then(([component, reducer]) => {
          injectAsyncReducer(store, 'vacancies', reducer.default);
          cb(null, component.default);
        })
      }
    },
    {
      path: 'vacancies/new',
      getComponent:(location, cb) => {
        Promise.all([
          System.import('./pages/NewVacancy'),
          System.import('./pages/NewVacancy/reducer')
        ]).then(([component, reducer]) => {
          injectAsyncReducer(store, 'newVacancy', reducer.default);
          cb(null, component.default);
        })
      },
      onEnter: MatchWhenAuthed
    },
    {
      path: 'vacancies/:id',
      getComponent:(location, cb) => {
        Promise.all([
          System.import('./pages/VacancyDetail'),
          System.import('./pages/VacancyDetail/reducer')
        ]).then(([component, reducer]) => {
          injectAsyncReducer(store, 'vacancyDetail', reducer.default);
          cb(null, component.default);
        });
      },
    }
  ];

  const authRoutes = [
    {
      path: 'login',
      getComponent:(location, cb) => {
        Promise.all([
          System.import('./pages/LoginPage'),
          System.import('./pages/LoginPage/reducer')
        ]).then(([component, reducer]) => {
          injectAsyncReducer(store, 'loginPage', reducer.default);
          cb(null, component.default);
        });
      },
      onEnter: isLogout
    },
    {
      path: 'signup',
      getComponent:(location, cb) => {
        Promise.all([
          System.import('./pages/SignupPage'),
          System.import('./pages/SignupPage/reducer')
        ]).then(([component, reducer]) => {
          injectAsyncReducer(store, 'signupPage', reducer.default);
          cb(null, component.default);
        });
      },
      onEnter: isLogout
    },
    {
      path: 'info_page',
      getComponent:(location, cb) => {
        System.import('./pages/InfoPage').then((InfoPage) => {
          cb(null, InfoPage.default)
        })
      },
      onEnter: isLogout
    },
    {
      path: 'restore_password',
      getComponent:(location, cb) => {
        Promise.all([
          System.import('./pages/RestorePassword'),
          System.import('./pages/RestorePassword/reducer')
        ]).then(([component, reducer]) => {
          injectAsyncReducer(store, 'restorePassword', reducer.default);
          cb(null, component.default);
        });
      },
      onEnter: isLogout
    },
    {
      path: 'confirm_email',
      getComponent:(location, cb) => {
        System.import('./pages/ConfirmEmailPage').then((ConfirmEmailPage) => {
          cb(null, ConfirmEmailPage.default)
        })
      },
      onEnter: isLogout
    },
    {
      path: 'account/:uid/password-reset/:token/',
      getComponent:(location, cb) => {
        Promise.all([
          System.import('./pages/PasswordChange'),
          System.import('./pages/PasswordChange/reducer')
        ]).then(([component, reducer]) => {
          injectAsyncReducer(store, 'passwordChange', reducer.default);
          cb(null, component.default);
        });
      },
      onEnter: isLogout
    },
    {
      path: 'account/:uid/activate/:token',
      getComponent: (location, cb) => {
        Promise.all([
          System.import('./pages/ActivateAccountPage'),
          System.import('./pages/ActivateAccountPage/reducer')
        ]).then(([component, reducer]) => {
          injectAsyncReducer(store, 'accountActivation', reducer.default);
          cb(null, component.default);
        });
      },
      onEnter: isLogout
    },
  ];

  const miscRoutes = [
    {
      path: '404',
      getComponent: (location, cb) => {
        System.import('./pages/NotFound').then((NotFound) => {
          cb(null, NotFound.default)
        })
      },
    },
    {
      path: '*',
      getComponent: (location, cb) => {
        System.import('./pages/NotFound').then((NotFound) => {
          cb(null, NotFound.default)
        })
      },
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
