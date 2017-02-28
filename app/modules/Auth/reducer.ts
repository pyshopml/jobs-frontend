import {
	AUTH_FETCHING,
	AUTH_SUCCESS,
	LOGOUT,
	SIGN_UP
} from './constants';

//import IPost from '../../interfaces/ipost'

const initialState = {
  isFetching: false,
  isSuccess: false,
  isError: false,
	result: {},
	isAuth: false,
	isSignUp: false,
	error: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH_FETCHING:
      return Object.assign({}, state, { isFetching: true });

    case AUTH_SUCCESS:
	    const isAuth = action.payload.auth_token ? true : false
      return Object.assign(
        {},
        state,
        { isSuccess: true, isFetching: false, result: action.payload, isAuth: isAuth }
      );

	  case LOGOUT:
      return Object.assign({}, state, initialState);

	  case SIGN_UP:
      return Object.assign({}, state, { result: action.payload, isAuth: false, isSignUp:true });

    default:
      return state;
  }
}