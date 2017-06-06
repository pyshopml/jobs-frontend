import { push } from 'react-router-redux';
import { isEmpty } from 'ramda';
import apiVerifyToken from 'api/token/validate';
import { removeUserFromCookie } from 'tools/user';
import {
  SAVE_INTENDED_PATH,
  LOGOUT_USER,
  CLEAR_INTENDED_PATH, VALIDATE_TOKEN,
} from './constants';


export const validateStoredToken = (dispatch, getState) => {
  const token = getState().getIn(['app', 'user', 'auth_token']);
  return dispatch({
    type: VALIDATE_TOKEN,
    payload: apiVerifyToken(token)
  }).catch(() => dispatch(logoutUser()))
};


export const logoutUser = () => dispatch => {
  removeUserFromCookie();
  dispatch(push('/'));
  dispatch({
    type: LOGOUT_USER
  });
};


export const redirectUser = (dispatch, getState) => {
  let state = getState();
  let intendedPath = state.get('app').get('intendedPath');

  if (isEmpty(intendedPath)) {
    dispatch(push('/'));
  } else {
    dispatch(push(`/${intendedPath}`));
    dispatch(clearIntendedPath());
  }
}

export const storeIntendedPath = (path: string) => ({
  type: SAVE_INTENDED_PATH,
  data: { path },
});

export const clearIntendedPath = () => ({
  type: CLEAR_INTENDED_PATH,
});