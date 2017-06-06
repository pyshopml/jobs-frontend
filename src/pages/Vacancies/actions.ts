import apiSearchAllVacancies from 'api/vacancies/searchAll';

import { LOAD_VACANCIES, UPDATE_SEARCH_STRING } from './constants';

export const  loadVacancies = (page: number, search?: string) => ({
  meta: {
    currentPage: page
  },
  type: LOAD_VACANCIES,
  payload: apiSearchAllVacancies(page, search)
});

export const updateSearchString = (searchString: string) => ({
  type: UPDATE_SEARCH_STRING,
  data: searchString
});