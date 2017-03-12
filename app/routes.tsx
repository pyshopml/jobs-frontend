import React from 'react';
import cookie from 'react-cookie'
import { Route, IndexRedirect } from 'react-router';
import App from './containers/App';
import Home from './containers/Home';
import Posts from './containers/PostsListContainer';
import NewPost from './containers/NewPost';
import { validateToken } from './containers/Auth/actions';
import PostDetail from './containers/PostDetail';
import NotFound from './containers/NotFound';

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
      <Route path="404" component={ NotFound }/>
      <Route path="*" component={ NotFound }/>
    </Route>
  );
};
