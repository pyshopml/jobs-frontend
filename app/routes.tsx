/* ------------------------------------------------------------------------------
* routes.jsx
*
* main routing config file
*
* Nick Luparev nikita.luparev@gmail.com
------------------------------------------------------------------------------- */
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import Home from './containers/Home';
import Posts from './containers/PostsListContainer';

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
    <Route path="/" component={ App } >
      <IndexRoute component={ Posts } />
    </Route>
  );
};
