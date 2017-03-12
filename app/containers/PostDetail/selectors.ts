import { createSelector } from 'reselect';

const selectSubstate = state => state.global.postDetail

export default createSelector(
  selectSubstate,
  (substate) => substate
)