import { createSelector } from 'reselect';

const selectSubstate = state => state.global.app;

export default createSelector(
  selectSubstate,
  (substate) => substate
);