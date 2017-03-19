import { push } from 'react-router-redux';
import { SignupCredentials, Action } from '../../interfaces';
import { SAVE_USER_CREDENTIALS } from '../App/constants';
import {
  SUBMIT_CREDENTIALS,
  SUBMIT_CREDENTIALS_SUCCEEDED,
  SUBMIT_CREDENTIALS_FAILED,
} from './constants';

const submitCredentials = (): Action => ({
  type: SUBMIT_CREDENTIALS,
});

const submitCredentialsSucceeded = (data: UserCredentials) => dispatch => {
  dispatch({ type: SUBMIT_CREDENTIALS_SUCCEEDED });
  dispatch({ type: SAVE_USER_CREDENTIALS, data: { username: data.username, email: data.email } });
  dispatch(push('/info_page'));
};

const submitCredentialsFailed = (message: string): Action => ({
  type: SUBMIT_CREDENTIALS_FAILED,
  message,
});

function submitDataToServer(data: SignupCredentials): Promise<Response> {
  const options = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  };

  return fetch('http://jobs.pyshop.ru/api/users/', options)
}

interface UserCredentials {
  username: string
  email: string
}

async function submitData(data: SignupCredentials, dispatch): Promise<void> {
  try {
    const res = await submitDataToServer(data);
    
    if (res.ok) {
      dispatch(submitCredentialsSucceeded(data));
      return;
    }

    dispatch(submitCredentialsFailed(res.statusText));
  } catch (e) {
    dispatch(submitCredentialsFailed(e.message))
  }
}

export const submitUserCredentials = (data: SignupCredentials) => dispatch => {
  dispatch(submitCredentials());
  submitData(data, dispatch);
}