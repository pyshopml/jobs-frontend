import { createSelector } from 'reselect';

const postsSelectors = state => state.get('posts');
const loginSubstate = state => state.get('app').get('isLoggedIn');

export default createSelector(
  postsSelectors,
  loginSubstate,
  (substate, isLoggedIn) => substate.set('isLoggedIn', isLoggedIn).toJS()
);