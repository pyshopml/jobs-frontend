import { createSelector } from 'reselect';

const selectSubstate = state => state.loginPage;

export default createSelector(
  selectSubstate,
  (substate) => substate
);