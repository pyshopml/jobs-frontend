import { Action } from '../../interfaces';
import {
  ACTIVATE_ACCOUNT,
  ACTIVATE_ACCOUNT_SUCCEEDED,
  ACTIVATE_ACCOUNT_FAILED,
} from './constants';

interface ActivateAccountState {
  isLoading: boolean;
  isAccountActivated: boolean;
}

const initialState: ActivateAccountState = {
  isLoading: true,
  isAccountActivated: false,
}

export default (state = initialState, action: Action): ActivateAccountState => {
  switch(action.type) {

    case ACTIVATE_ACCOUNT:
      return state;

    case ACTIVATE_ACCOUNT_SUCCEEDED:
      return Object.assign(
        {},
        state,
        { isLoading: false, isAccountActivated: true }
      );

    case ACTIVATE_ACCOUNT_FAILED:
      return Object.assign(
        {},
        state,
        { isLoading: false }
      );

    case "@@router/LOCATION_CHANGE":
      return initialState;

    default:
      return state
  }
}