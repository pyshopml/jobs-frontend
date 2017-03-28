import * as React from 'react';
import { Route, IndexRoute } from 'react-router';
import { last } from 'ramda';
import App from './containers/App';
import Vacancies from './pages/Vacancies';
import NewPost from './pages/NewPost';
import PostDetail from './pages/PostDetail';
import NotFound from './pages/NotFound';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import InfoPage from './pages/InfoPage';
import PasswordRestorePage from './pages/RestorePassword';
import PasswordChangePage from './pages/PasswordChange';
import ConfirmEmailPage from './pages/ConfirmEmailPage';
import ActivateAccountPage from './pages/ActivateAccountPage';
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
