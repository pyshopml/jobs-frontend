import cookie from 'react-cookie'

import {
	AUTH_FETCHING,
	AUTH_SUCCESS,
	SIGN_UP,
	LOGOUT
} from './constants';



 async function authenticate(data, dispatch){

	 dispatch({
		 type:AUTH_FETCHING
	 })

	 try {
		 const res = await fetch('http://jobs.pyshop.ru/api/account/login/', {
			 headers: {
				 'Accept': 'application/json',
				 'Content-Type': 'application/json'
			 },
			 method: 'POST',
			 body: JSON.stringify(data)
		 });
		 console.log('resssssssssssssssssssssssssssssss')
		 console.log(res)
		 console.log(res.status)
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

async function authSignUp(data, dispatch){

	dispatch({
		type:AUTH_FETCHING
	})

	try {
		const res = await fetch('http://jobs.pyshop.ru/api/users/', {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify(data)
		});
		console.log('resssssssssssssssssssssssssssssss')
		console.log(res)

		let result = await res.json()
		console.log(result)
		console.log(typeof res.status)
		console.log()
		if(parseInt(String(res.status)[0]) === 2){
			dispatch({
				type:SIGN_UP,
				payload:result
			})
		} else {
			dispatch({
				type:'SIGN_UP_ERROR',
				payload:result
			})
		}

	} catch(e) {
		console.log(e.message)
	}

}

export const logout = ():any =>{
	return {
		type:LOGOUT
	}


}
export const signUp = (data):any =>{
	return (dispatch) =>{
		authSignUp(data, dispatch)
	}
}


export const auth = (data):any =>{
	return (dispatch) =>{
		authenticate(data, dispatch)
	}
}
