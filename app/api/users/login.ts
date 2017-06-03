const sendRequest = (data) => {
  const options = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  };

  return fetch(`${config.apiUrl}account/login/`, options)
}

export default async function loginUser(credentials: any) {
  try {
    const res = await sendRequest(credentials);
    const data = await res.json();

    if(!res.ok)
      throw new Error(data.non_field_errors[0]);
    return data;
  } catch (e) {
    return Promise.reject(e.message);
  }
}