import { createSelector } from 'reselect';

const selectIsAuthStateRestoring = state => state.app.isAuthStateRestoring;

export default createSelector(
  selectIsAuthStateRestoring,
  (IsAuthStateRestoring) => ({ IsAuthStateRestoring })
)