import { createSelector } from 'reselect';

const selectSubstate = state => state.global.auth

export default createSelector(
  selectSubstate,
  (substate) => substate
);
