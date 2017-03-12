import { createSelector } from 'reselect';

const postsSelectors = state => state.global.posts;
const selectIsAuth = state => state.global.auth.isAuth;


export default createSelector(
  postsSelectors,
  selectIsAuth,
  (substate, isAuth) => ({...substate, isAuth})
);