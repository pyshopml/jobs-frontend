import { createSelector } from 'reselect';

const selectSubstate = state => state.global.loginPage;

export default createSelector(
  selectSubstate,
  (substate) => substate
);