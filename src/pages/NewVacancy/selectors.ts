import { createSelector } from 'reselect';

const selectSubstate = state => state.get('newVacancy');
const selectToken = state => state.getIn(['app', 'user', 'auth_token']);

export default createSelector(
  selectSubstate,
  selectToken,
  (substate, auth_token) => substate.set('auth_token', auth_token).toJS()
)