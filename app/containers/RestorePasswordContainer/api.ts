const submitRequest = (email: string) => {
  const options = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email })
  };

  return fetch('http://jobs.pyshop.ru/api/account/password/reset/', options)
}

export async function submitData(email: string, done, error: (msg: string) => void) {
  try {
    const res = await submitRequest(email);

    if (res.ok) {
      done();
      return;
    }

    error(res.statusText);
  } catch (e) {
    error(e.message);
  }
}