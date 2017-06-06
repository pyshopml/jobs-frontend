import { push } from 'react-router-redux';
import { SignupCredentials } from './interfaces';
import apiSignup from 'api/users/signup';
import { SIGNUP_USER } from './constants';

export const submitUserCredentials = (data: SignupCredentials) => (dispatch) => (
  dispatch({
    type: SIGNUP_USER,
    payload: apiSignup(data)
  }).then(({value}) => dispatch( push({
      pathname: '/info_page',
      state: { email: value.email }
    })) )
)
