import { IAction } from 'interfaces';
import { submitNewPassword } from './api';
import {
  PASSWORD_CHANGE,
  PASSWORD_CHANGE_SUCCEEDED,
  PASSWORD_CHANGE_FAILED,
} from './constants';

const changeStarted = (): IAction => ({
  type: PASSWORD_CHANGE,
});

const changeSucceeded = (): IAction => ({
  type: PASSWORD_CHANGE_SUCCEEDED,
});

const changeFailed = (message: string): IAction => ({
  type: PASSWORD_CHANGE_FAILED,
  message,
});

export const changePassword = (data: any) => dispatch => {
  dispatch(changeStarted());
  submitNewPassword(
    data,
    () => dispatch(changeSucceeded()),
    (msg: string) => dispatch(changeFailed(msg)),
  );
}