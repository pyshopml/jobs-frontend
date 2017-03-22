import { createSelector } from 'reselect';

const selectSubstate = state => state.signupPage;

export default createSelector(
  selectSubstate,
  (substate) => substate
);