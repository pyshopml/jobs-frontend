import { createSelector } from 'reselect';

const selectSubstate = state => state.get('app');

export default createSelector(
  selectSubstate,
  (substate) => substate.toJS()
);