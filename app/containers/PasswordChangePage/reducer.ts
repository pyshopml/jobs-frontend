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

const initialState: PasswordChangePage = {
  message: '',
  isLoading: false,
};

export default (state = initialState, action: Action): PasswordChangePage => {
  switch(action.type) {

    case PASSWORD_CHANGE:
      return Object.assign({}, state, { isLoading: true });

    case PASSWORD_CHANGE_SUCCEEDED:
      return Object.assign(
        {},
        state,
        { isLoading: false, message: 'Пароль успешно обновлен!' }
      );

    case PASSWORD_CHANGE_FAILED:
      return Object.assign(
        {},
        state,
        { isLoading: false, message: action.message }
      );

    case "@@router/LOCATION_CHANGE":
      return initialState;

    default:
      return state;
  }
}