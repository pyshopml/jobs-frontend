import { push } from 'react-router-redux';
import { Action } from 'interfaces';
import { submitData } from './api';
import {
  PASSWORD_RESTORE,
  PASSWORD_RESTORE_SUCCEEDED,
  PASSWORD_RESTORE_FAILED,
  CLEAR_STATE,
} from './constants';

const passwordRestore = (): Action => ({
  type: PASSWORD_RESTORE,
});

const passwordRestoreSucceeded = (): Action => ({
  type: PASSWORD_RESTORE_SUCCEEDED,
});

const passwordRestoreFailed = (message): Action => ({
  type: PASSWORD_RESTORE_FAILED,
  message
});

const clearState = (): Action => ({
  type: CLEAR_STATE,
});

export const submitEmail = (email: string) => dispatch => {
  dispatch({ type: PASSWORD_RESTORE });
  submitData(
    email,
    () => dispatch(passwordRestoreSucceeded()),
    (msg: string) => dispatch(passwordRestoreFailed(msg)),
  );
}

export const goBackHandler = () => dispatch => {
  dispatch(clearState());
  dispatch(push('/login'));
}