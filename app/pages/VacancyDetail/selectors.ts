import { createSelector } from 'reselect';

const selectSubstate = state => state.get('vacancyDetail');

export default createSelector(
  selectSubstate,
  (substate) => substate.toJS()
)