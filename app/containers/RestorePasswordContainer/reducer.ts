import { Action } from '../../interfaces';
import {
  PASSWORD_RESTORE,
  PASSWORD_RESTORE_SUCCEEDED,
  PASSWORD_RESTORE_FAILED,
  CLEAR_STATE,
} from './constants';

interface RestorePassword {
  message: string;
  isLoading: boolean;
}

const initialState: RestorePassword = {
  message: '',
  isLoading: false,
};

export default (state = initialState, action: Action) => {
  switch(action.type) {

    case PASSWORD_RESTORE:
      return Object.assign({}, state, { isLoading: true });

    case PASSWORD_RESTORE_SUCCEEDED:
      return Object.assign({}, state, { isLoading: false, message: 'Инструкции высланы на почту' });

    case PASSWORD_RESTORE_FAILED:
      return Object.assign({}, state, { isLoading: false, message: action.message });

    case CLEAR_STATE:
      return Object.assign({}, state, { message: '' });

    default:
      return state
  }
}