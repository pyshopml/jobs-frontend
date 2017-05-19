import { goBack } from 'react-router-redux';
import { INewVacancy } from 'interfaces';
import selectors from './selectors';
import { push } from 'react-router-redux';
import { addNotification } from "containers/Alert/actions";
import { IAction } from 'interfaces';
import { SuccessNotification, WarningNotification } from 'models/Notification';

import {
  uploadVacancy,
  fetchFieldsValues
} from './api';

import {
  UPLOAD_VACANCY,
  UPLOAD_VACANCY_SUCCEEDED,
  UPLOAD_VACANCY_FAILURE,
  LOAD_FIELDS_VALUES,
  LOAD_FIELDS_VALUES_FAILED,
  LOAD_FIELDS_VALUES_SUCCEEDED
} from './constants';

const submitVacancy = (): IAction => ({
  type: UPLOAD_VACANCY,
});

const submitVacancySucceeded = (createdVacancy): IAction => ({
  type: UPLOAD_VACANCY_SUCCEEDED,
  data: { createdVacancy },
});

const submitVacancyFailed = (message: string): IAction => ({
  type: UPLOAD_VACANCY_FAILURE,
  message
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
      dispatch(submitVacancySucceeded(Vacancy))
    },
    (msg: string) => {
      let notification = new WarningNotification({
        message: msg,
      });

      dispatch(addNotification(notification));
      dispatch(submitVacancyFailed(msg))
    },
  )
}

const loadingFieldsValuesSucceeded = (data) : IAction => ({
  type: LOAD_FIELDS_VALUES_SUCCEEDED,
  data
});

const loadingFieldsValuesFailed = (errorMessage: string) : IAction => ({
  type: LOAD_FIELDS_VALUES_FAILED,
  errorMessage
});

export const loadFieldsValues = () => dispatch => {
  dispatch({ type: LOAD_FIELDS_VALUES });
  fetchFieldsValues(
    (data) => dispatch(loadingFieldsValuesSucceeded(data)),
    (msg : string) => dispatch(loadingFieldsValuesFailed(msg)),
  );
};



export const handleCancel = () => dispatch => dispatch(goBack());