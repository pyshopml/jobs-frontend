import { goBack } from 'react-router-redux';
import { INewVacancy } from 'interfaces';
import selectors from './selectors';
import { push } from 'react-router-redux';
import { addNotification } from "containers/Alert/actions";
import { IAction } from 'interfaces';
import { SuccessNotification, WarningNotification } from 'models/Notification';

import {
  uploadVacancy,
  fetchFieldsValues,
  fetchCities,
  fetchCountries
} from './api';

import {
  UPLOAD_VACANCY, UPLOAD_VACANCY_SUCCEEDED, UPLOAD_VACANCY_FAILURE,
  LOAD_FIELDS_VALUES, LOAD_FIELDS_VALUES_SUCCEEDED, LOAD_FIELDS_VALUES_FAILED,
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

  const state = selectors(getState())

  uploadVacancy(
    Vacancy,
    state.auth_token,
    (Vacancy: any) => {

      let notification = new SuccessNotification({
        message: 'Вакансия создана',
        label: 'Открыть',
        action: () => dispatch(push(`/vacancies/${Vacancy.id}`)),
       });

      dispatch(addNotification(notification));
      dispatch(actionSucceeded(UPLOAD_VACANCY_SUCCEEDED, { createdVacancy: Vacancy }))
    },
    (msg: string) => {
      let notification = new WarningNotification({
        message: msg,
      });

      dispatch(addNotification(notification));
      dispatch(actionFailed(UPLOAD_VACANCY_FAILURE, msg))
    },
  )
}


export const loadFieldsValues = () => dispatch => {
  dispatch({ type: LOAD_FIELDS_VALUES });
  fetchFieldsValues(
    (data) => dispatch(actionSucceeded(LOAD_FIELDS_VALUES_SUCCEEDED, data)),
    (msg : string) => dispatch(actionFailed(LOAD_FIELDS_VALUES_FAILED, msg)),
  );
};


export const loadCountries = (searchString) => dispatch => {
  dispatch({ type: LOAD_COUNTRIES });
  fetchCountries(
    searchString,
    (data) => dispatch(actionSucceeded(LOAD_COUNTRIES_SUCCEEDED, data)),
    (msg : string) => dispatch(actionFailed(LOAD_COUNTRIES_FAILED, msg)),
  );
};


export const loadCities = (searchString) => dispatch => {
  dispatch({ type: LOAD_CITIES });
  fetchCities(
    searchString,
    (data) => dispatch(actionSucceeded(LOAD_CITIES_SUCCEEDED, data)),
    (msg : string) => dispatch(actionFailed(LOAD_CITIES_FAILED, msg)),
  );
};



export const handleCancel = () => dispatch => dispatch(goBack());