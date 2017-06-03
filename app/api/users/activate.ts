const sendRequest = (data): Promise<Response> => {
  const options = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  };

  return fetch(`${config.apiUrl}account/activate/`, options);
}

export default async function activateUser(data: any) {
  try {
    const res = await sendRequest(data);
    if (!res.ok)
      throw new Error(res.statusText);
    return await res.json()
  } catch (e) {
    return Promise.reject(e.message);
  }
}