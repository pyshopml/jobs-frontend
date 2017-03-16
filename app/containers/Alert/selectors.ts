import { createSelector } from 'reselect';

const selectSubstate = state => state.global.alert;

export default createSelector(
  selectSubstate,
  (substate) => substate
)