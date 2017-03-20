import { createSelector } from 'reselect';

const selectUserCredentials = state => state.global.app;

export default createSelector(
  selectUserCredentials,
  (substate) => substate
);