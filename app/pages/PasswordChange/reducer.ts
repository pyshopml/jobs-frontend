import { fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import { IAction } from 'interfaces';
import {
  PASSWORD_CHANGE,
  PASSWORD_CHANGE_SUCCEEDED,
  PASSWORD_CHANGE_FAILED,
} from './constants';

const initialState = fromJS({
  message: '',
  isLoading: false,
});

export default (state = initialState, action: IAction) => {
  switch(action.type) {

    case PASSWORD_CHANGE:
      return state.set('isLoading', true);

    case PASSWORD_CHANGE_SUCCEEDED:
      return state.merge({ isLoading: false, message: 'Пароль успешно обновлен!' });

    case PASSWORD_CHANGE_FAILED:
      return state.merge({ isLoading: false, message: action.message });

    case LOCATION_CHANGE:
      return initialState;

    default:
      return state;
  }
}