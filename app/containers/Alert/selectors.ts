import { createSelector } from 'reselect';

const selectSubstate = state => state.get('alert');

export default createSelector(
  selectSubstate,
  (substate) => substate.toJS()
)