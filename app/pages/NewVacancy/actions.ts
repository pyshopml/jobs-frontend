import { push } from 'react-router-redux';

import { INewVacancy } from 'interfaces';
import { IAction } from 'interfaces';
import { SuccessNotification, WarningNotification } from 'models/Notification';

import { addNotification } from "containers/Alert/actions";

import selectors from './selectors';

import apiGetAllCategories from 'api/categories/getAll';
import apiGetAllKeywords from 'api/keywords/getAll';
import apiCreateVacancy from 'api/vacancies/create';
import apiSearchCities from 'api/cities/searchAll';
import apiSearchCountries from 'api/countries/searchAll';

import {
  UPLOAD_VACANCY, UPLOAD_VACANCY_SUCCEEDED, UPLOAD_VACANCY_FAILURE,
  LOAD_CATEGORIES, LOAD_CATEGORIES_SUCCEEDED, LOAD_CATEGORIES_FAILED,
  LOAD_KEYWORDS, LOAD_KEYWORDS_SUCCEEDED, LOAD_KEYWORDS_FAILED,
  LOAD_COUNTRIES, LOAD_COUNTRIES_SUCCEEDED, LOAD_COUNTRIES_FAILED,
  LOAD_CITIES, LOAD_CITIES_SUCCEEDED, LOAD_CITIES_FAILED
} from './constants';

const actionSucceeded = (constant, data) => ({
  type: constant,
  data
});

const actionFailed = (constant, errMessage) => ({
  type: constant,
  errMessage
});

const submitVacancy = (): IAction => ({
  type: UPLOAD_VACANCY,
});

export const createVacancy = (Vacancy: INewVacancy) => (dispatch, getState) => {
  dispatch(submitVacancy());

  const state = selectors(getState());

  apiCreateVacancy(Vacancy, state.auth_token)
    .then( (Vacancy: any) => {
      let notification = new SuccessNotification({
        message: 'Вакансия создана',
        label: 'Открыть',
        action: () => dispatch(push(`/vacancies/${Vacancy.id}`)),
      });

      dispatch(addNotification(notification));
      dispatch(actionSucceeded(UPLOAD_VACANCY_SUCCEEDED, { createdVacancy: Vacancy }))
    })
    .catch( (msg: string) => {
      let notification = new WarningNotification({
        message: msg,
      });

      dispatch(addNotification(notification));
      dispatch(actionFailed(UPLOAD_VACANCY_FAILURE, msg))
    } )
}

export const loadCategories = () => dispatch => {
  dispatch({ type: LOAD_CATEGORIES });
  apiGetAllCategories()
    .then( (data) => dispatch(actionSucceeded(LOAD_CATEGORIES_SUCCEEDED, data)) )
    .catch( (msg : string) => dispatch(actionFailed(LOAD_CATEGORIES_FAILED, msg)) )
};


export const loadKeywords = () => dispatch => {
  dispatch({ type: LOAD_KEYWORDS });
  apiGetAllKeywords()
    .then( (data) => dispatch(actionSucceeded(LOAD_KEYWORDS_SUCCEEDED, data)) )
    .catch( (msg : string) => dispatch(actionFailed(LOAD_KEYWORDS_FAILED, msg)) )
};


export const loadCountries = (searchString) => dispatch => {
  dispatch({ type: LOAD_COUNTRIES });
  apiSearchCountries(searchString)
    .then( (data) => dispatch(actionSucceeded(LOAD_COUNTRIES_SUCCEEDED, data)) )
    .catch( (msg : string) => dispatch(actionFailed(LOAD_COUNTRIES_FAILED, msg)) )
};


export const loadCities = (searchString) => dispatch => {
  dispatch({ type: LOAD_CITIES });
  apiSearchCities(searchString)
    .then( (data) => dispatch(actionSucceeded(LOAD_CITIES_SUCCEEDED, data)) )
    .catch( (msg : string) => dispatch(actionFailed(LOAD_CITIES_FAILED, msg)) )
};
