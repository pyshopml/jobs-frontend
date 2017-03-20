import { createSelector } from 'reselect';

const selectSubstate = state => state.global.passwordChange;

const selectUid = (state, props) => props.params.uid;

const selectToken = (state, props) => props.params.token;

export default createSelector(
  selectSubstate,
  selectUid,
  selectToken,
  (substate, uid, token) => Object.assign(substate, { uid, token })
);