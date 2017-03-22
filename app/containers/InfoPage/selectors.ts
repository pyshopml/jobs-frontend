import { createSelector } from 'reselect';

const selectUserCredentials = state => state.app;

export default createSelector(
  selectUserCredentials,
  (substate) => substate
);