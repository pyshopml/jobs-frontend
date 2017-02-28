import { createSelector } from 'reselect';

const postsSelectors = state => state.global.posts;

export default createSelector(
  postsSelectors,
  (substate) => substate
);