
import React from 'react';
import cookie from 'react-cookie'
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import Home from './containers/Home';
import Posts from './containers/PostsListContainer';
import NewPost from './containers/NewPost';
import { validateToken } from './containers/Auth/actions';


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
      <IndexRoute component={ Posts } />
      <Route path="add_post" component={ NewPost }/>
    </Route>
  );
};
