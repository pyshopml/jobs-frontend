import { createSelector } from 'reselect';

const selectSubstate = state => state.get('postDetail');

export default createSelector(
  selectSubstate,
  (substate) => substate.toJS()
)