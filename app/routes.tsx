import * as React from 'react';
import cookie from 'react-cookie'
import { Route, IndexRoute } from 'react-router';
import { last } from 'ramda';
import App from './containers/App';
import Vacancies from './containers/VacancyList';
import NewPost from './containers/NewPost';
import PostDetail from './containers/PostDetail';
import NotFound from './containers/NotFound';
import LoginPage from './containers/LoginPage';
import SignupPage from './containers/SignupPage';
import InfoPage from './containers/InfoPage';
import PasswordRestorePage from './containers/RestorePasswordContainer';
import PasswordChangePage from './containers/PasswordChangePage';
import ConfirmEmailPage from './containers/ConfirmEmailPage';
import ActivateAccountPage from './containers/ActivateAccountPage';
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

  return (
    <Route path="/" component={ App }>
      <IndexRoute component={ Vacancies } />
      <Route path="vacancies" component={ Vacancies }/>
      <Route path="vacancies/new" component={ NewPost } onEnter={ MatchWhenAuthed } />
      <Route path="vacancies/:id" component={ PostDetail }/>
      <Route path="login" component={ LoginPage } onEnter={ isLogout } />
      <Route path="signup" component={ SignupPage } onEnter={ isLogout } />
      <Route path="info_page" component={ InfoPage } onEnter={ isLogout } />
      <Route path="restore_password" component={ PasswordRestorePage } onEnter={ isLogout } />
      <Route path="/confirm_email" component={ ConfirmEmailPage } onEnter={ isLogout } />
      <Route path="/account/:uid/password-reset/:token/" component={ PasswordChangePage } onEnter={ isLogout } />
      <Route path="/account/:uid/activate/:token/" component={ ActivateAccountPage } onEnter={ isLogout } />
      <Route path="404" component={ NotFound }/>
      <Route path="*" component={ NotFound }/>
    </Route>
  );
};
