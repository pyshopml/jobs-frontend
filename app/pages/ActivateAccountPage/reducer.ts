import { fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import {
  ACTIVATE_ACCOUNT,
  ACTIVATE_ACCOUNT_SUCCEEDED,
  ACTIVATE_ACCOUNT_FAILED,
} from './constants';

interface ActivateAccountState {
  isLoading: boolean;
  isAccountActivated: boolean;
}

const initialState = fromJS({
  isLoading: true,
  isAccountActivated: false,
});

export default (state = initialState, action) => {
  switch(action.type) {

    case ACTIVATE_ACCOUNT:
      return state;

    case ACTIVATE_ACCOUNT_SUCCEEDED:
      return state.merge({ isLoading: false, isAccountActivated: true });

    case ACTIVATE_ACCOUNT_FAILED:
      return state.set('isLoading', false);

    case LOCATION_CHANGE:
      return initialState;

    default:
      return state
  }
}