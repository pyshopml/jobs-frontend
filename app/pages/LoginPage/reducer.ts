import { fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import { IAction } from 'interfaces';
import {
  LOGIN_USER,
  LOGIN_USER_SUCCEEDED,
  LOGIN_USER_FAILED,
} from './constants';

const initialState = fromJS({
  message: '',
  isLoading: false,
});

export default (state = initialState, action: IAction) => {
  switch(action.type) {

    case LOGIN_USER:
      return state.set('isLoading', true);

    case LOGIN_USER_SUCCEEDED:
      return state.merge({ message: '', isLoading: false });

    case LOGIN_USER_FAILED:
      return state.merge({ message: action.message, isLoading: false });

    case LOCATION_CHANGE:
      return initialState;

    default:
      return state;
  }
}