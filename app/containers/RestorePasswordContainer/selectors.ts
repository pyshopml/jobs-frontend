import { createSelector } from 'reselect';

const selectSubstate = state => state.global.restorePassword;

export default createSelector(
  selectSubstate,
  (substate) => substate
);