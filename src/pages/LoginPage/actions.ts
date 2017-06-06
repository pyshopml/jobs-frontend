import apiLoginUser from 'api/users/login';
import { LOGIN_USER } from './constants';
import { redirectUser } from 'containers/App/actions';
import { setUserToCookie } from 'tools/user'

export const loginUser = (credentials: any) =>
  (dispatch) => (
    dispatch({
      type: LOGIN_USER,
      payload: apiLoginUser(credentials),
    }).then(({value}) => setUserToCookie(value))
      .then(() => dispatch(redirectUser))
  );
