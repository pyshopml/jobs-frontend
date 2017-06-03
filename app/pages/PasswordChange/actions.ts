import { IAction } from 'interfaces';
import apiSubmitNewPassword from 'api/users/password/reset';
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
  apiSubmitNewPassword(data)
    .then( () => dispatch(changeSucceeded()) )
    .catch( (msg: string) => dispatch(changeFailed(msg)) )
}