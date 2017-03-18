import { push } from 'react-router-redux';
import { Action } from '../../interfaces';
// import { SAVE_AUTH_CREDENTIALS } from '../App/constants';  FIX THIS 
import { submitData } from './api';
import {
  LOGIN_USER,
  LOGIN_USER_SUCCEEDED,
  LOGIN_USER_FAILED,
} from './constants';

interface AuthCredentials {
  auth_token: string;
}

const loginSubmit = (): Action => ({
  type: LOGIN_USER,
});

const loginSubmitSucceeded = (data: AuthCredentials) => dispatch => {
  dispatch({ type: LOGIN_USER_SUCCEEDED });
  // dispatch({ type: SAVE_AUTH_CREDENTIALS, data: data.auth_token });  !!!!!
  dispatch(push('/'));
};

const loginSubmitFailed = (message: string): Action => ({
  type: LOGIN_USER_FAILED,
  message,
});

export const loginUser = (credentials: any) => dispatch => {
  dispatch(loginSubmit());
  submitData(
    credentials,
    data => dispatch(loginSubmitSucceeded(data)),
    (msg: string) => dispatch(loginSubmitFailed(msg))
  );
};