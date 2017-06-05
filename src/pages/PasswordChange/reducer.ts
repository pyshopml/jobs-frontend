import { fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import {
  PASSWORD_CHANGE_PENDING,
  PASSWORD_CHANGE_FULFILLED,
  PASSWORD_CHANGE_REJECTED,
} from './constants';

const initialState = fromJS({
  message: '',
  isLoading: false,
});

export default (state = initialState, action) => {
  switch(action.type) {

    case PASSWORD_CHANGE_PENDING:
      return state.set('isLoading', true);

    case PASSWORD_CHANGE_FULFILLED:
      return state.merge({ isLoading: false, message: 'Пароль успешно обновлен!' });

    case PASSWORD_CHANGE_REJECTED:
      return state.merge({ isLoading: false, message: action.payload });

    case LOCATION_CHANGE:
      return initialState;

    default:
      return state;
  }
}