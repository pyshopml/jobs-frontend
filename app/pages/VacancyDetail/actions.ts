import { IAction } from 'interfaces';
import { replace } from 'react-router-redux'
import apiGetOneVacancy from 'api/vacancies/getOne';
import {
  LOAD_VACANCY,
  LOAD_VACANCY_SUCCEEDED,
  LOAD_VACANCY_FAILURE
} from './constants';

const loadingVacancy = (): IAction => ({
  type: LOAD_VACANCY,
});

const loadingVacancySucceeded = (vacancy): IAction => ({
  type: LOAD_VACANCY_SUCCEEDED,
  data: { vacancy }
});

const loadingVacancyFailed = (errorMessage: string): IAction => ({
  type: LOAD_VACANCY_FAILURE,
  errorMessage
});

export const loadVacancy = (id: number) =>
  (dispatch) => {
    dispatch(loadingVacancy());
    apiGetOneVacancy(id)
      .then( (vacancy) => dispatch(loadingVacancySucceeded(vacancy)) )
      .catch( (msg) => {
        if(msg == 'Not found') dispatch(replace('/404'))
        else dispatch(loadingVacancyFailed(msg))
      } )
  };
