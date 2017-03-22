import { createSelector } from 'reselect';

const selectSubstate = state => state.loginPage;
const loginSubstate = state => state.app.isLoggedIn;

export default createSelector(
  selectSubstate,
  (substate) => substate
);