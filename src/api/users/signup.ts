import { SignupCredentials } from 'pages/SignupPage/interfaces';

function sendRequest(data: SignupCredentials): Promise<Response> {
  const options = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  };

  return fetch(`${config.apiUrl}users/`, options)
}

export default async function restorePassword(data: SignupCredentials): Promise<any> {
  try {
    const res = await sendRequest(data);
    const result = await res.json();

    if (!res.ok)
      throw new Error(result.email[0]);

    return data;
  } catch (e) {
    return Promise.reject(e.message)
  }
}