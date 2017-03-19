import { createSelector } from 'reselect';

const selectSubstate = state => state.global.signupPage;

export default createSelector(
  selectSubstate,
  (substate) => substate
);