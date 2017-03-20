import { push } from 'react-router-redux';
import { Action } from '../../interfaces';
import { SignupCredentials, UserCredentials } from './interfaces';
import { SAVE_USER_CREDENTIALS } from '../App/constants';
import { submitData } from './api';
import {
  SUBMIT_CREDENTIALS,
  SUBMIT_CREDENTIALS_SUCCEEDED,
  SUBMIT_CREDENTIALS_FAILED,
} from './constants';

const signupUser = (): Action => ({
  type: SUBMIT_CREDENTIALS,
});

const signupSucceeded = (): Action => ({
  type: SUBMIT_CREDENTIALS_SUCCEEDED,
});

const saveCredentials = (data: any): Action => ({
  type: SAVE_USER_CREDENTIALS,
  data,
});

const submitCredentialsSucceeded = (data: UserCredentials) => dispatch => {
  dispatch(signupSucceeded());
  saveCredentials({ username: data.username, email: data.email });
  dispatch(push('/info_page'));
};

const submitCredentialsFailed = (message: string): Action => ({
  type: SUBMIT_CREDENTIALS_FAILED,
  message,
});

export const submitUserCredentials = (data: SignupCredentials) => dispatch => {
  dispatch(signupUser());
  submitData(
    data,
    (data: any) => dispatch(submitCredentialsSucceeded(data)),
    (msg: string) => dispatch(submitCredentialsFailed(msg)),
  );
}