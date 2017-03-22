import { createSelector } from 'reselect';

const postsSelectors = state => state.posts;
const loginSubstate = state => state.app.isLoggedIn;

export default createSelector(
  postsSelectors,
  loginSubstate,
  (substate, isLoggedIn) => Object.assign(substate, { isLoggedIn })
);