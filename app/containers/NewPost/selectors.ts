import { createSelector } from 'reselect';

const selectSubstate = state => state.global.newPost;
const selectToken = state => state.global.app.auth_token;

export default createSelector(
  selectSubstate,
  selectToken,
  (substate, auth_token) => ({...substate, auth_token })
)