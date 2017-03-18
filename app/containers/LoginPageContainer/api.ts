const submitRequest = (data) => {
  const options = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  };

  return fetch('http://jobs.pyshop.ru/api/account/login/', options)
}

export async function submitData(credentials: any, done, error: (msg: string) => void) {
  try {
    const res = await submitRequest(credentials);
    const data = await res.json();

    if (res.ok) {
      done(data);
      return;
    } else {
      error(data.non_field_errors[0])
    }

  } catch (e) {
    error(e.message);
  }
}