import  * as queryString from 'query-string';

function fetchVacanciesFromServer( page: number ) {
  const options = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  };

  return fetch(`${config.apiUrl}vacancies/?${queryString.stringify({page})}`, options)
}

function searchVacanciesOnServer( page: number, search: string ) {
  const options = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  };

  const params = {
    section: 'title',
    phrase: search,
    page
  }

  return fetch(`${config.apiUrl}vacancies/actions/search/?${queryString.stringify(params)}`, options)
}

export async function fetchVacancies(options: { page: number, search: string },
                                     done: (data) => any, error: (msg: string) => any) {
  try {
    const { page, search } = options;
    let res;
    if(options.search) {
      res = await searchVacanciesOnServer(page, search);
    } else {
      res = await fetchVacanciesFromServer(page);
    }
    if (res.ok) {
      let data = await res.json();
      done(data);
    }

    error(res.statusText);

  } catch (e) {
    error(e.message);
  }
}
