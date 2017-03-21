import { createSelector } from 'reselect';

const postsSelectors = state => state.global.posts;
const isLoggedIn = state => state.global.app.isLoggedIn;

export default createSelector(
  postsSelectors,
  isLoggedIn,
  (substate, isLoggedIn) => Object.assign(substate, { isLoggedIn })
);