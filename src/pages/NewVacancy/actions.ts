import { push } from 'react-router-redux';

import { INewVacancy } from 'interfaces';
import { SuccessNotification, WarningNotification } from 'models/Notification';

import { addNotification } from "containers/Alert/actions";

import selectors from './selectors';

import apiGetAllCategories from 'api/categories/getAll';
import apiGetAllKeywords from 'api/keywords/getAll';
import apiCreateVacancy from 'api/vacancies/create';
import apiSearchCities from 'api/cities/searchAll';
import apiSearchCountries from 'api/countries/searchAll';

import {
  UPLOAD_VACANCY,
  LOAD_CATEGORIES,
  LOAD_KEYWORDS,
  LOAD_COUNTRIES,
  LOAD_CITIES,
} from './constants';

export const createVacancy = (Vacancy: INewVacancy) => (
  (dispatch, getState) => {
    const state = selectors(getState());

    return dispatch({
      type: UPLOAD_VACANCY,
      payload: apiCreateVacancy(Vacancy, state.auth_token)
    }).then(({ value }) => {
      const notification = new SuccessNotification({
        message: 'Вакансия создана',
        label: 'Открыть',
        action: () => dispatch(push(`/vacancies/${value.id}`)),
      });

      dispatch(addNotification(notification));
    })
      .catch(( reason ) => {
        const notification = new WarningNotification({
          message: reason,
        });

        dispatch(addNotification(notification));
      })
  }
)

export const loadCategories = () => ({
  type: LOAD_CATEGORIES,
  payload: apiGetAllCategories()
})

export const loadKeywords = () => ({
  type: LOAD_KEYWORDS,
  payload: apiGetAllKeywords()
})

export const loadCountries = (searchString) => ({
  type: LOAD_COUNTRIES,
  payload: apiSearchCountries(searchString)
})

export const loadCities = (searchString) => ({
  type: LOAD_CITIES,
  payload: apiSearchCities(searchString)
})

