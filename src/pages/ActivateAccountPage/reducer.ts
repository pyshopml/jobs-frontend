import { fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import {
  ACTIVATE_ACCOUNT_PENDING,
  ACTIVATE_ACCOUNT_REJECTED,
  ACTIVATE_ACCOUNT_FULFILLED,
} from './constants';

const initialState = fromJS({
  isLoading: true,
  isAccountActivated: false,
});

export default (state = initialState, action) => {
  switch(action.type) {

    case ACTIVATE_ACCOUNT_PENDING:
      return state;

    case ACTIVATE_ACCOUNT_FULFILLED:
      return state.merge({ isLoading: false, isAccountActivated: true });

    case ACTIVATE_ACCOUNT_REJECTED:
      return state.set('isLoading', false);

    case LOCATION_CHANGE:
      return initialState;

    default:
      return state
  }
}