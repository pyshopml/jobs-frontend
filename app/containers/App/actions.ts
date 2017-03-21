import { Action } from '../../interfaces';
import {
  SAVE_AUTH_CREDENTIALS,
  LOGOUT_USER,
} from './constants';

export const saveAuthCredentials = (data: any): Action => ({
  type: SAVE_AUTH_CREDENTIALS,
  data,
});

export const logoutUser = (): Action => ({
  type: LOGOUT_USER,
});