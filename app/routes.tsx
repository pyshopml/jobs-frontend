import * as React from 'react';
import cookie from 'react-cookie'
import { Route, IndexRedirect } from 'react-router';
import { last } from 'ramda';
import App from './containers/App';
import Posts from './containers/PostsListContainer';
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

export default (store) => {

  const saveIntendedPath = (path: string) => {
    store.dispatch(storeIntendedPath(path));
  }

  const isLogout = (nextState, replace) => {
    const { app: { isLoggedIn } } = store.getState();
    if (isLoggedIn) {
      replace({
        pathname: '/',
        state: { nextPathname: nextState.location.pathname },
      });
    }
  };

  const MatchWhenAuthed = (nextState, replace) => {

    const { routes } = nextState;
    let intendedPath = last(routes).path;
    saveIntendedPath(intendedPath);

    const { app: { isLoggedIn } } = store.getState();
    if (!isLoggedIn) {
      replace({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname },
      });
    }
  };

  return (
    <Route path="/" component={ App }>
      <IndexRedirect to="/vacancies" />
      <Route path="vacancies" component={ Posts }/>
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
