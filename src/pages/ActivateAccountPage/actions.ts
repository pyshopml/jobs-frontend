import apiActivateUser from 'api/users/activate';
import { ACTIVATE_ACCOUNT } from './constants';

export const activateAccount = (data: any) => ({
  payload: apiActivateUser(data),
  type: ACTIVATE_ACCOUNT
});
