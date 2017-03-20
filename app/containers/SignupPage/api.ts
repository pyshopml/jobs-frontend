import { SignupCredentials } from './interfaces';

function submitDataToServer(data: SignupCredentials): Promise<Response> {
  const options = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  };

  return fetch('http://jobs.pyshop.ru/api/users/', options)
}

export async function submitData(data: SignupCredentials, done, error: (msg: string) => void): Promise<void> {
  try {
    const res = await submitDataToServer(data);
    
    if (res.ok) {
      done(data);
      return;
    }

    if (res.status === 400) {
      let result = await res.json();
      error(result.email[0]);
    }
    
  } catch (e) {
    error(e.message);
  }
}