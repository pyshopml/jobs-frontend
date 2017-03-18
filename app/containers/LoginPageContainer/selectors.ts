import { createSelector } from 'reselect';

const selectSubstate = state => state.global.login;

export default createSelector(
  selectSubstate,
  (substate) => substate
);