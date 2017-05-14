import { createSelector } from 'reselect';

const vacanciesSelectors = state => {console.log(state.toJS()); return state.get('vacancies')};
const loginSubstate = state => state.get('app').get('isLoggedIn');

export default createSelector(
  vacanciesSelectors,
  loginSubstate,
  (substate, isLoggedIn) => substate.set('isLoggedIn', isLoggedIn).toJS()
);