import { Action } from 'interfaces';
import { submitActionData } from './api';
import {
  ACTIVATE_ACCOUNT,
  ACTIVATE_ACCOUNT_SUCCEEDED,
  ACTIVATE_ACCOUNT_FAILED,
} from './constants';

const activateStarted = (): Action => ({
  type: ACTIVATE_ACCOUNT,
});

const activateSucceeded = (): Action => ({
  type: ACTIVATE_ACCOUNT_SUCCEEDED,
});

const activateFailed = (message: string) => ({
  type: ACTIVATE_ACCOUNT_FAILED,
  message,
});

export const activateAccount = (data: any) => dispatch => {
  dispatch(activateStarted())
  submitActionData(
    data,
    () => dispatch(activateSucceeded()),
    (msg: string) => dispatch(activateFailed(msg)),
  );
}