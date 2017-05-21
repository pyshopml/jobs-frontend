import { INewVacancy } from 'interfaces';
import  * as queryString from 'query-string';

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

function fetchCitiesFromServer(searchString: string) {
  const options = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  };
  const params = {
    search: searchString
  }

  return fetch(`${config.apiUrl}cities/?${queryString.stringify(params)}`, options)
}

function fetchCountriesFromServer(searchString: string) {
  const options = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  };
  const params = {
    search: searchString
  }

  return fetch(`${config.apiUrl}countries/?${queryString.stringify(params)}`, options)
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

export async function fetchCities(searchString: string, done: (data) => any,
                                  error: (msg: string) => any) {
  try {
    const res = await fetchCitiesFromServer(searchString);
    if (!res.ok)
      throw new Error(res.statusText);
    const cities = await res.json();
    done(cities);
  } catch (e) {
    error(e.message);
  }
}

export async function fetchCountries(searchString: string, done: (data) => any,
                                     error: (msg: string) => any) {
  try {
    const res = await fetchCountriesFromServer(searchString);
    if (!res.ok)
      throw new Error(res.statusText);
    const countries = await res.json()
    done(countries);
  } catch (e) {
    error(e.message);
  }
}

export async function fetchFieldsValues( done: (data) => any, error: (msg: string) => any) {
  try {
    const fieldsValuesResponses: any = {};
    const fieldsValues: any = {};

    fieldsValuesResponses.categories = await fetchCategoriesFromServer();
    fieldsValuesResponses.keywords = await fetchKeywordsFromServer();

    for(let key in fieldsValuesResponses){
      if(fieldsValuesResponses.hasOwnProperty(key)){
        const res = fieldsValuesResponses[key];
        if(!res.ok) throw new Error(res.statusText);
        fieldsValues[key] = await res.json();
      }
    }

    done(fieldsValues);

  } catch (e) {
    error(e.message);
  }
}