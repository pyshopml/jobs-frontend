import { createSelector } from 'reselect';

const selectSubstate = state => state.get('restorePassword');

export default createSelector(
  selectSubstate,
  (substate) => substate.toJS()
);