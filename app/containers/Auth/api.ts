import { SignupCredentials, LoginCredentials } from './interfaces';

function authSignUpOnServer(data: SignupCredentials) {
  const options = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(data),
  };

  return fetch('http://jobs.pyshop.ru/api/users/', options);
}

export async function authSignUp(data : SignupCredentials, done, doneFail, error) {
  try {
    const res = await authSignUpOnServer(data);
	  const result = await res.json();
	  if(res.ok){
		  done(result);
	  } else {
		  doneFail(result)
	  }
  } catch(e) {
    error(e.message);
  }
}

function authenticateOnServer(data : LoginCredentials) {
  const options = {
    headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(data),
  };

  return fetch('http://jobs.pyshop.ru/api/account/login/', options).then(res => res.json());
}

export async function authenticate(data : LoginCredentials, done: (res: any) => void, error: (msg: string) => void) {
  try {
     const res = await authenticateOnServer(data);
    done(res);
  } catch(e) {
    error(e.message);
  }
}

