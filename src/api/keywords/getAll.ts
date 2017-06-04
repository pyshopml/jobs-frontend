function sendRequest() {
  const options = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  };

  return fetch(`${config.apiUrl}vacancies/tags/`, options)
}

export default async function getKeywords() {
  try {
    const res = await sendRequest();
    if (!res.ok)
      throw new Error(res.statusText);

    return await res.json();
  } catch (e) {
    return Promise.reject(e.message);
  }
}