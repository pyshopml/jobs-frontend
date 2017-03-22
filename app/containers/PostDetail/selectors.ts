import { createSelector } from 'reselect';

const selectSubstate = state => state.postDetail

export default createSelector(
  selectSubstate,
  (substate) => substate
)