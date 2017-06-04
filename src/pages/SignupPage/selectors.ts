import { createSelector } from 'reselect';

const selectSubstate = state => state.get('signupPage');

export default createSelector(
  selectSubstate,
  (substate) => substate.toJS()
);