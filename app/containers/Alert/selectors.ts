import { createSelector } from 'reselect';

const selectSubstate = state => state.alert;

export default createSelector(
  selectSubstate,
  (substate) => substate
)