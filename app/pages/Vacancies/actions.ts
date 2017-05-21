import { IAction } from 'interfaces';
import { fetchVacancies } from './api';

import {
  LOAD_VACANCIES, LOAD_VACANCIES_SUCCEEDED, LOAD_VACANCIES_FAILED,
  UPDATE_SEARCH_STRING,
} from './constants';

const loadingSucceeded = (data) : IAction => ({
  type: LOAD_VACANCIES_SUCCEEDED,
  data
});

const loadingFailed = (errorMessage: string) : IAction => ({
  type: LOAD_VACANCIES_FAILED,
  errorMessage
});

export const loadVacancies = (page: number, search?: string) => dispatch => {
  dispatch({ type: LOAD_VACANCIES });
  fetchVacancies(
    {page, search},
    (data) => dispatch(loadingSucceeded(Object.assign(data, { currentPage: page }))),
    (msg : string) => dispatch(loadingFailed(msg)),
  );
};

export const updateSearchString = (searchString: string) : IAction => ({
  type: UPDATE_SEARCH_STRING,
  data: searchString
});