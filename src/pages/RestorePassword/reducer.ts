import { fromJS } from 'immutable';
import { IAction } from 'interfaces';
import {
  PASSWORD_RESTORE_PENDING,
  PASSWORD_RESTORE_FULFILLED,
  PASSWORD_RESTORE_REJECTED,
  CLEAR_STATE,
} from './constants';

const initialState = fromJS({
  message: '',
  isLoading: false,
});

export default (state = initialState, action) => {
  switch(action.type) {

    case PASSWORD_RESTORE_PENDING:
      return state.set('isLoading', true);

    case PASSWORD_RESTORE_FULFILLED:
      return state.merge({ isLoading: false, message: 'Инструкции высланы на почту' });

    case PASSWORD_RESTORE_REJECTED:
      return state.merge({ isLoading: false, message: action.payload });

    case CLEAR_STATE:
      return state.set('message', '');

    default:
      return state
  }
}