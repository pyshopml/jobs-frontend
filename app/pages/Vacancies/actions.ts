import { IAction } from 'interfaces';
import { fetchVacancies } from './api';

import {
  LOAD_VACANCIES,
  LOAD_VACANCIES_SUCCEEDED,
  LOAD_VACANCIES_FAILED,
} from './constants';

const loadingSucceeded = (data) : IAction => ({
  type: LOAD_VACANCIES_SUCCEEDED,
  data
});

const loadingFailed = (errorMessage: string) : IAction => ({
  type: LOAD_VACANCIES_FAILED,
  errorMessage
});

export const loadVacancies = (pageNum: number) => dispatch => {
  dispatch({ type: LOAD_VACANCIES });
  fetchVacancies(
    pageNum,
    (data) => dispatch(loadingSucceeded(Object.assign(data, { currentPage: pageNum }))),
    (msg : string) => dispatch(loadingFailed(msg)),
  );
};
