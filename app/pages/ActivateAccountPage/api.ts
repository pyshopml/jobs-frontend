const submitRequest = (data): Promise<Response> => {
  const options = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  };

  return fetch('http://jobs.pyshop.ru/api/account/activate/', options);
}

export async function submitActionData(data: any, done, error: (msg: string) => void) {
  try {
    const res = await submitRequest(data);

    if (res.ok) {
      done();
      return;
    }

    error(res.statusText);
  } catch (e) {
    error(e.message);
  }
}