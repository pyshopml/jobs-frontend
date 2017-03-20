import * as React from 'react';
import cookie from 'react-cookie'
import { Route, IndexRedirect } from 'react-router';
import App from './containers/App';
import Posts from './containers/PostsListContainer';
import NewPost from './containers/NewPost';
import { validateToken } from './containers/Auth/actions';
import PostDetail from './containers/PostDetail';
import NotFound from './containers/NotFound';
import LoginPage from './containers/LoginPageContainer';
import SignupPage from './containers/SignupPage';
import InfoPage from './containers/InfoPage';
import PasswordRestorePage from './containers/RestorePasswordContainer';

export default (store) => {
  
  const MatchWhenAuthed = (nextState, replace) => {
    const { global: { login: { authed } } } = store.getState();
    if (!authed) {
      replace({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname },
      });
    }
  };

  return (
    <Route path="/" component={ App } onEnter={validateToken(store.dispatch)}>
      <IndexRedirect to="/vacancies" />
      <Route path="vacancies" component={ Posts }/>
      <Route path="vacancies/new" component={ NewPost }/>
      <Route path="vacancies/:id" component={ PostDetail }/>
      <Route path="login" component={ LoginPage } />
      <Route path="signup" component={ SignupPage } />
      <Route path="info_page" component={ InfoPage } />
      <Route path="restore_password" component={ PasswordRestorePage } />
      <Route path="404" component={ NotFound }/>
      <Route path="*" component={ NotFound }/>
    </Route>
  );
};
