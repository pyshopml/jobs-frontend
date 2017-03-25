import { fromJS } from 'immutable';
import { Action } from '../../interfaces';
import {
  PASSWORD_CHANGE,
  PASSWORD_CHANGE_SUCCEEDED,
  PASSWORD_CHANGE_FAILED,
} from './constants';

interface PasswordChangePage {
  message: string;
  isLoading: boolean;
}

const initialState = fromJS({
  message: '',
  isLoading: false,
});

export default (state = initialState, action: Action) => {
  switch(action.type) {

    case PASSWORD_CHANGE:
      return state.set('isLoading', true);

    case PASSWORD_CHANGE_SUCCEEDED:
      return state.merge({ isLoading: false, message: 'Пароль успешно обновлен!' });

    case PASSWORD_CHANGE_FAILED:
      return state.merge({ isLoading: false, message: action.message });

    case "@@router/LOCATION_CHANGE":
      return initialState;

    default:
      return state;
  }
}