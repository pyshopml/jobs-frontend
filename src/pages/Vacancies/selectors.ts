import { createSelector } from 'reselect';

const vacanciesSelectors = state => state.get('vacancies');
const loginSubstate = state => state.get('app').get('isLoggedIn');

export default createSelector(
  vacanciesSelectors,
  loginSubstate,
  (substate, isLoggedIn) => substate.set('isLoggedIn', isLoggedIn).toJS()
);