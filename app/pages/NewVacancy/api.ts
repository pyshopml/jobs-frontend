import { INewVacancy } from 'interfaces';

function uploadVacancyToServer(vacancy: INewVacancy, token: string) {
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

function fetchCategoriesFromServer() {
  const options = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  };

  return fetch(`${config.apiUrl}vacancies/categories/`, options)
}

function fetchKeywordsFromServer() {
  const options = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  };

  return fetch(`${config.apiUrl}vacancies/tags/`, options)
}

export async function uploadVacancy(vacancy: INewVacancy,
                                 token: string,
                                 done: (vacancy) => any,
                                 error: (msg: string) => any) {
  try {
    const res = await uploadVacancyToServer(vacancy, token);
    if (!res.ok)
      throw new Error(res.statusText);
    const createdVacancy = await res.json()
    done(createdVacancy);
  } catch (e) {
    error(e.message);
  }
}

export async function fetchKeywords( done: (data) => any, error: (msg: string) => any) {
  try {
    const res = await fetchKeywordsFromServer();

    if (res.ok) {
      let data = await res.json();
      done(data);
    }

    error(res.statusText);

  } catch (e) {
    error(e.message);
  }
}

export async function fetchCategories( done: (data) => any, error: (msg: string) => any) {
  try {
    const res = await fetchCategoriesFromServer();

    if (res.ok) {
      let data = await res.json();
      done(data);
    }

    error(res.statusText);

  } catch (e) {
    error(e.message);
  }
}