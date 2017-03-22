import { createSelector } from 'reselect';

const selectSubstate = state => state.newPost;
const selectToken = state => state.app.auth_token;

export default createSelector(
  selectSubstate,
  selectToken,
  (substate, auth_token) => ({...substate, auth_token })
)