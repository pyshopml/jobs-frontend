import { createSelector } from 'reselect';

const selectSubstate = state => state.restorePassword;

export default createSelector(
  selectSubstate,
  (substate) => substate
);