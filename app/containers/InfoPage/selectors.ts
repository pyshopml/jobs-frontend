import { createSelector } from 'reselect';

const selectUserCredentials = state => state.get('app');

export default createSelector(
  selectUserCredentials,
  (substate) => substate.toJS()
);