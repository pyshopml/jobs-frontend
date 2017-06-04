import { push } from 'react-router-redux';
import { IAction } from 'interfaces';
import apiRestorePassword from 'api/users/password/restore';
import {
  PASSWORD_RESTORE,
  PASSWORD_RESTORE_SUCCEEDED,
  PASSWORD_RESTORE_FAILED,
  CLEAR_STATE,
} from './constants';

const passwordRestore = (): IAction => ({
  type: PASSWORD_RESTORE,
});

const passwordRestoreSucceeded = (): IAction => ({
  type: PASSWORD_RESTORE_SUCCEEDED,
});

const passwordRestoreFailed = (message): IAction => ({
  type: PASSWORD_RESTORE_FAILED,
  message
});

const clearState = (): IAction => ({
  type: CLEAR_STATE,
});

export const submitEmail = (email: string) => dispatch => {
  dispatch({ type: PASSWORD_RESTORE });
  apiRestorePassword(email)
    .then( () => dispatch(passwordRestoreSucceeded()) )
    .catch( (msg: string) => dispatch(passwordRestoreFailed(msg)) )
}

export const goBackHandler = () => dispatch => {
  dispatch(clearState());
  dispatch(push('/login'));
}