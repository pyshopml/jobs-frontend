const submitRequest = (data): Promise<Response> => {
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


export async function submitNewPassword(data: any, done, error: (msg: string) => void) {
  try {
    const res = await submitRequest(data);

    if (res.ok) {
      done();
      return
    } 
   
    error('Предоставленные данные не верны.');
  } catch (e) {
    error(e.message);
  }
}