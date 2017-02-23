import { createSelector } from 'reselect';

const selectSubstate = state => state.global.newPost;

export default createSelector(
  selectSubstate,
  (substate) => substate
)