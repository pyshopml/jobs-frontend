function sendRequest(id: number) {
  const options = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  };

  return fetch(`${config.apiUrl}vacancies/${id}/`, options)
}

export default async function getOneVacancy(id: number){
  try {
    const res = await sendRequest(id);
    if (res.status == 404)
      throw new Error('Not found')

    if (!res.ok)
      throw new Error(res.statusText);

    return await res.json()
  } catch (e) {
    return Promise.reject(e.message)
  }
}