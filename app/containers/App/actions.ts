import * as cookie from 'react-cookie'
import { push } from 'react-router-redux';
import { isEmpty } from 'ramda';
import { Action } from '../../interfaces';
import { verifyToken } from './api';
import {
  SAVE_AUTH_CREDENTIALS,
  SAVE_INTENDED_PATH,
  LOGOUT_USER,
  CLEAR_INTENDED_PATH,
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


const redirectUser = (dispatch, getState) => {
  let state = getState();
  let intendedPath = state.get('app').get('intendedPath');

  if (isEmpty(intendedPath)) {
    dispatch(push('/'));
  } else {
    dispatch(push(`/${intendedPath}`));
    dispatch(clearIntendedPath());
  }
}

export const saveAuthCredentials = (data: any) => (dispatch, getState) => {
  const { auth_token } = data;
  saveToCookie(TOKEN, auth_token);
  dispatch(saveCredentials(data));
  redirectUser(dispatch, getState);
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

export const storeIntendedPath = (path: string): Action => ({
  type: SAVE_INTENDED_PATH,
  data: { path },
});

export const clearIntendedPath = (): Action => ({
  type: CLEAR_INTENDED_PATH,
});