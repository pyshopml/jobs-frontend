import { IAction } from 'interfaces';
import { saveAuthCredentials } from 'containers/App/actions';
import apiLoginUser from 'api/users/login';
import {
  LOGIN_USER,
  LOGIN_USER_SUCCEEDED,
  LOGIN_USER_FAILED,
} from './constants';

interface AuthCredentials {
  auth_token: string;
}

const loginSubmit = (): IAction => ({
  type: LOGIN_USER,
});

const loginSucceeded = (): IAction => ({
  type: LOGIN_USER_SUCCEEDED,
});

const loginSubmitSucceeded = (data: AuthCredentials) => dispatch => {
  dispatch(loginSucceeded());
  dispatch(saveAuthCredentials(data));
};

const loginSubmitFailed = (message: string): IAction => ({
  type: LOGIN_USER_FAILED,
  message,
});

export const loginUser = (credentials: any) => dispatch => {
  dispatch(loginSubmit());
  apiLoginUser(credentials)
    .then( data => dispatch(loginSubmitSucceeded(data)) )
    .catch( (msg: string) => dispatch(loginSubmitFailed(msg)) )
};