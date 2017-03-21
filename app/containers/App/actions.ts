import { push } from 'react-router-redux';
import { Action } from '../../interfaces';
import {
  SAVE_AUTH_CREDENTIALS,
  LOGOUT_USER,
} from './constants';

export const saveAuthCredentials = (data: any): Action => ({
  type: SAVE_AUTH_CREDENTIALS,
  data,
});

const logout = (): Action => ({
  type: LOGOUT_USER
});

export const logoutUser = () => dispatch => {
  dispatch(logout());
  dispatch(push('/'));
};