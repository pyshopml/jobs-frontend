import { createSelector } from 'reselect';

const selectSubstate = state => state.get('loginPage');

export default createSelector(
  selectSubstate,
  (substate) => substate.toJS()
);