import { createSelector } from 'reselect';

const selectSubstate = state => state.get('app');

const selectPath = (state, props) => props.location.pathname.slice(1)

export default createSelector(
  selectSubstate,
  selectPath,
  (substate, pathname) => substate.set('pathname', pathname).toJS()
)