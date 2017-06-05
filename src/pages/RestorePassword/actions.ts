import { push } from 'react-router-redux';
import { IAction } from 'interfaces';
import apiRestorePassword from 'api/users/password/restore';
import {
  PASSWORD_RESTORE,
  CLEAR_STATE,
} from './constants';

const clearState = (): IAction => ({
  type: CLEAR_STATE,
});

export const submitEmail = (email: string) => ({
  type: PASSWORD_RESTORE,
  payload: apiRestorePassword(email)
})

export const goBackHandler = () => dispatch => {
  dispatch(clearState());
  dispatch(push('/login'));
}