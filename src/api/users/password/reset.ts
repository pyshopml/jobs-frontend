const sendRequest = (data): Promise<Response> => {
  const options = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  };

  return fetch(`${config.apiUrl}account/password/reset/confirm/`, options);
}


export default async function resetPassword(data: any) {
  try {
    const res = await sendRequest(data);

    if(!res.ok)
      throw new Error('Предоставленные данные неверны.');

    return await res.json();
  } catch (e) {
    return Promise.reject(e.message);
  }
}