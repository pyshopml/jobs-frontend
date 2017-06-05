import { push } from 'react-router-redux';
import { IAction } from 'interfaces';
import { SignupCredentials, UserCredentials } from './interfaces';
import { SAVE_USER_CREDENTIALS } from 'containers/App/constants';
import apiSignup from 'api/users/signup';
import { SUBMIT_CREDENTIALS } from './constants';

const saveCredentials = (data: any): IAction => ({
  type: SAVE_USER_CREDENTIALS,
  data,
});

export const submitUserCredentials = (data: SignupCredentials) => (dispatch) => (
  dispatch({
    type: SUBMIT_CREDENTIALS,
    payload: apiSignup(data)
  }).then(({value}) => saveCredentials({ username: value.username, email: value.email }))
    .then(() => dispatch(push('/info_page')))
)
