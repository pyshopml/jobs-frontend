import  * as queryString from 'query-string';

function sendRequest(searchString: string) {
  const options = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  };
  const params = {
    search: searchString
  };

  return fetch(`${config.apiUrl}cities/?${queryString.stringify(params)}`, options)
}

export default async function serchSities(searchString: string){
  try {
    const res = await sendRequest(searchString);
    if (!res.ok)
      throw new Error(res.statusText);
    return await res.json();

  } catch (e) {
    return Promise.reject(e.message);
  }
}