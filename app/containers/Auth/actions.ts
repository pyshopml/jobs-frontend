import cookie from 'react-cookie'
import { LoginCredentials, SignupCredentials, Action } from './interfaces';
import { authSignUp, authenticate } from './api';
import {
	AUTH_FETCHING,
	AUTH_SUCCESS,
	AUTH_FAILED,
	SIGN_UP,
	SIGN_UP_ERROR,
	LOGOUT
} from './constants';



const signUpError = (payload: any): Action => ({
	type: SIGN_UP_ERROR,
	payload,
});

const signUpSucceeded = (payload: any): Action => ({
	type: SIGN_UP,
	payload,
});

const signUpFailed = (errorMessage: string): Action => ({
	type: AUTH_FAILED,
	errorMessage,
});

const authSucceeded = (payload: any) : Action => ({
	type: AUTH_SUCCESS,
	payload,
});

const authFailed = (errorMessage: string) : Action => ({
	type: AUTH_SUCCESS,
	errorMessage,
});

export const logout = () : Action => ({
	type: LOGOUT
});

export  const signUp = (data : SignupCredentials) => (dispatch: (action: Action) => void) => {
	dispatch({ type: AUTH_FETCHING });
	authSignUp(
		data, 
		(data) => dispatch(signUpSucceeded(data)),
		(data) => dispatch(signUpError(data)),
		(msg: string) => dispatch(signUpError(msg))
	);
};

export const auth = (data : LoginCredentials) => (dispatch: (action: Action) => void) => {
	dispatch({ type: AUTH_FETCHING });
	authenticate(
		data, 
		(data) => dispatch(authSucceeded(data)),
		(msg: string) => dispatch(authFailed(msg))
	);
}
