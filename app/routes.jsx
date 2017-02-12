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
import Home from './containers/Home'

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
    <Route name="app" path="/" component={ App } >
      <IndexRoute component={ Home } />
    </Route>
  );
};
