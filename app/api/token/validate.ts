const sendRequest = (data): Promise<Response> => {
  const options = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(data),
  };

  return fetch(`${config.apiUrl}account/authtoken/validate/`, options);
};

export default async function validateToken(auth_token: string): Promise<any> {
  try {
    let res = await sendRequest({ auth_token });

    if (!res.ok)
      throw new Error(res.statusText);

    return await res.json()
  } catch (e) {
    return Promise.reject(e.message);
  }
}