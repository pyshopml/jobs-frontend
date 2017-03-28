import { createSelector } from 'reselect';

const selectSubstate = state => state.get('passwordChange');

const selectUid = (state, props) => props.params.uid;

const selectToken = (state, props) => props.params.token;

export default createSelector(
  selectSubstate,
  selectUid,
  selectToken,
  (substate, uid, token) => substate.merge({ uid, token }).toJS()
);