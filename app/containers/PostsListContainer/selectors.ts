import { createSelector } from 'reselect';

const postsSelectors = state => state.global.posts;
const loginSubstate = state => state.global.app.isLoggedIn;

export default createSelector(
  postsSelectors,
  loginSubstate,
  (substate, isLoggedIn) => Object.assign(substate, { isLoggedIn })
);