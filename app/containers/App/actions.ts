import * as cookie from 'react-cookie'
import { push } from 'react-router-redux';
import { Action } from '../../interfaces';
import { verifyToken } from './api';
import {
  SAVE_AUTH_CREDENTIALS,
  LOGOUT_USER,
} from './constants';

const TOKEN = 'pyjobs/token';

// ----- working with cookies -----
const readFromCookie = (key: string): string => cookie.load(key);

const saveToCookie = (key: string, data: any): void => cookie.save(key, data);

const removeFromCookie = (key: string): void => cookie.remove(key);
// ----- working with cookies -----


export const saveCredentials = (data: any): Action => ({
  type: SAVE_AUTH_CREDENTIALS,
  data,
});

export const saveAuthCredentials = (data: any) => dispatch => {
  const { auth_token } = data;
  saveToCookie(TOKEN, auth_token);
  dispatch(saveCredentials(data));
};

const logout = (): Action => ({
  type: LOGOUT_USER
});

export const logoutUser = () => dispatch => {
  removeFromCookie(TOKEN);
  dispatch(logout());
  dispatch(push('/'));
};

export const restoreAuthState = () => dispatch => {
  // retrieve token from cookies and verify it on server
  // if it's valid update state & login user

  let auth_token = readFromCookie(TOKEN);

  if (auth_token) {
    verifyToken(
      auth_token,
      () => dispatch(saveAuthCredentials({ auth_token }))
    );
  }
};