import { saveAuthCredentials } from 'containers/App/actions';
import apiLoginUser from 'api/users/login';
import { LOGIN_USER } from './constants';

export const loginUser = (credentials: any) => (
  (dispatch) => (
    dispatch({
      type: LOGIN_USER,
      payload: apiLoginUser(credentials)
    }).then((data) => dispatch(saveAuthCredentials(data.value)))
  )
)
