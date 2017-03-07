import { createSelector } from 'reselect';

const selectSubstate = state => state.global.newPost;
const selectToken = state => state.global.auth.result.auth_token;
const selectIsAuth = state => state.global.auth.isAuth;


export default createSelector(
  selectSubstate,
  selectToken,
  selectIsAuth,
  (substate, auth_token, isAuth) => ({...substate, auth_token, isAuth})
)