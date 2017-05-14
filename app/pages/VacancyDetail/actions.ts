import { Action } from 'interfaces';
import { replace } from 'react-router-redux'
import { fetchVacancy } from './api';
import {
  LOAD_VACANCY,
  LOAD_VACANCY_SUCCEEDED,
  LOAD_VACANCY_FAILURE
} from './constants';

const loadingVacancy = (): Action => ({
  type: LOAD_VACANCY,
});

const loadingVacancySucceeded = (vacancy): Action => ({
  type: LOAD_VACANCY_SUCCEEDED,
  data: { vacancy }
});

const loadingVacancyFailed = (errorMessage: string): Action => ({
  type: LOAD_VACANCY_FAILURE,
  errorMessage
});

export const loadVacancy = (id: number) =>
  (dispatch) => {
    dispatch(loadingVacancy());
    fetchVacancy(
      id,
      (vacancy) => dispatch(loadingVacancySucceeded(vacancy)),
      (msg) => dispatch(loadingVacancyFailed(msg)),
      () => dispatch(replace('/404'))
    )
  };
