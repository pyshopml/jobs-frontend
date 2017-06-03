import  * as queryString from 'query-string';

function sendRequest( page: number, search?: string ) {
  const options = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  };

  if (search) {
    const params = {
      section: 'title',
      phrase: search,
      page
    }
    return fetch(`${config.apiUrl}vacancies/actions/search/?${queryString.stringify(params)}`, options)
  }

  return fetch(`${config.apiUrl}vacancies/?${queryString.stringify({page})}`, options)
}

export default async function searchAllVacancies( page: number, search?: string ) {
  try {
    const res = await sendRequest(page, search);

    if (!res.ok)
      throw new Error(res.statusText);

    return await res.json();
  } catch (e) {
    return Promise.reject(e.message);
  }
}