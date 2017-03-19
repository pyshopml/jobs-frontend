import { createSelector } from 'reselect';

const selectSubstate = state => state.global.signup;

export default createSelector(
  selectSubstate,
  (substate) => substate
);