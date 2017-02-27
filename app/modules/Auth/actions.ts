import cookie from 'react-cookie'
import { LoginCredentials, SignupCredentials, Action } from './interfaces';

import {
	AUTH_FETCHING,
	AUTH_SUCCESS,
	SIGN_UP,
	LOGOUT
} from './constants';


 async function authenticate(data : LoginCredentials, dispatch) {
	 try {
		 const res = await fetch('http://jobs.pyshop.ru/api/account/login/', {
			 headers: {
				 'Accept': 'application/json',
				 'Content-Type': 'application/json'
			 },
			 method: 'POST',
			 body: JSON.stringify(data)
		 });
		 let result = await res.json()
		 /*if(result.auth_token){
			 cookie.save('token', result.auth_token)
		 }*/
		 dispatch({
			 type:AUTH_SUCCESS,
			 payload:result
		 })


	 } catch(e) {
		 console.log(e.message)
	 }

}

async function authSignUp(data : SignupCredentials, dispatch) {
	try {
		const res = await fetch('http://jobs.pyshop.ru/api/users/', {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify(data)
		});

		let result = await res.json()
		if(result.id){
			dispatch({
				type:SIGN_UP,
				payload:result
			})
		}

	} catch(e) {
		console.log(e.message)
	}
}

export const logout = () : Action => ({
	type: LOGOUT
});

export const signUp = (data : SignupCredentials) => dispatch => {
	dispatch({ type: AUTH_FETCHING });
	authSignUp(data, dispatch)
};

export const auth = (data : LoginCredentials) => dispatch => {
	dispatch({ type: AUTH_FETCHING });
	authenticate(data, dispatch);
}
