import {
  SAVE_AUTH_CREDENTIALS
} from './constants';

export const saveAuthCredentials = (data: any) => ({
  type: SAVE_AUTH_CREDENTIALS,
  data,
});