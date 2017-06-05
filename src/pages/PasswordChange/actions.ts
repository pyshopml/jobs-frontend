import apiSubmitNewPassword from 'api/users/password/reset';
import { PASSWORD_CHANGE } from './constants';

export const changePassword = (data: any) => ({
  type: PASSWORD_CHANGE,
  payload: apiSubmitNewPassword(data)
})
