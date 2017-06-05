const sendRequest = (email: string) => {
  const options = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email })
  };

  return fetch(`${config.apiUrl}account/password/reset/`, options)
}

export default async function restorePassword(email: string) {
  try {
    const res = await sendRequest(email);

    if (!res.ok){
      const data = await res.json();
      throw new Error(data.email[0]);
    }

  } catch (e) {
    return Promise.reject(e.message)
  }
}