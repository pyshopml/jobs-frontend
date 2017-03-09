import cookie from 'react-cookie'
import { LoginCredentials, SignupCredentials, Action } from './interfaces';
import { authSignUp, authenticate, validate } from './api';
import {
	AUTH_FETCHING,
	AUTH_SUCCESS,
	AUTH_FAILED,
	SIGN_UP,
	SIGN_UP_ERROR,
	VALIDATE_ERROR,
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

const authStarted = (): Action => ({
	type: AUTH_FETCHING,
});

const authSucceeded = (payload: any) : Action => ({
	type: AUTH_SUCCESS,
	payload,
});

const authFailed = (errorMessage: string) : Action => ({
	type: AUTH_SUCCESS,
	errorMessage,
});

const logoutUser = () => ({
	type: LOGOUT
});

const readFromCookie = (key: string): string => cookie.load(key);

const removeFromCookie = (key: string): void => cookie.remove(key);

const saveToCookie = (key: string, data: any): void => cookie.save(key, data);

export const logout = () => dispatch => {
	removeFromCookie('token');
	dispatch(logoutUser());
};

const validateError = (payload: any) : Action => ({
	type: VALIDATE_ERROR,
	payload
});

export const validateToken = dispatch => () => {
	dispatch(authStarted());

	const data = {
		auth_token: readFromCookie('token'),
	}

	validate(
		data,
		(data: any) => dispatch(authSucceeded(data)),
		(data: any) => dispatch(validateError(data)),
		(msg: string) => console.log('vvv3')  // ???
	)
}

export const signUp = (data : SignupCredentials) => (dispatch: (action: Action) => void) => {
	dispatch(authStarted());
	authSignUp(
		data, 
		(data) => dispatch(signUpSucceeded(data)),
		(data) => dispatch(signUpError(data)),
		(msg: string) => dispatch(signUpError(msg))
	);
};

export const auth = (data : LoginCredentials) => (dispatch: (action: Action) => void) => {
	console.log('dispatch') // ???
	console.log(dispatch) // ???
	
	dispatch(authStarted());
	authenticate(
		data, 
		(data) => {
			saveToCookie('token', data.auth_token);
			return dispatch(authSucceeded(data))
		},
		(msg: string) => dispatch(authFailed(msg))
	)
}
