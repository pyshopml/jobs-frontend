import { createSelector } from 'reselect';

const selectSubstate = state => state.app;

export default createSelector(
  selectSubstate,
  (substate) => substate
);