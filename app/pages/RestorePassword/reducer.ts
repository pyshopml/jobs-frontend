import { fromJS } from 'immutable';
import { Action } from 'interfaces';
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

const initialState = fromJS({
  message: '',
  isLoading: false,
});

export default (state = initialState, action: Action) => {
  switch(action.type) {

    case PASSWORD_RESTORE:
      return state.set('isLoading', true);

    case PASSWORD_RESTORE_SUCCEEDED:
      return state.merge({ isLoading: false, message: 'Инструкции высланы на почту' });

    case PASSWORD_RESTORE_FAILED:
      return state.merge({ isLoading: false, message: action.message });

    case CLEAR_STATE:
      return state.set('message', '');

    default:
      return state
  }
}