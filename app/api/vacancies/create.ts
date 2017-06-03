import { INewVacancy } from "interfaces";

function sendRequest(vacancy: INewVacancy, token: string) {
  const options = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    },
    body: JSON.stringify(vacancy)
  };

  return fetch(`${config.apiUrl}vacancies/`, options)
}

export default async function createVacancy(vacancy: INewVacancy, token: string) {
  try {
    const res = await sendRequest(vacancy, token);
    if (!res.ok)
      throw new Error(res.statusText);
    return await res.json()
  } catch (e) {
    return Promise.reject(e.message);
  }
}