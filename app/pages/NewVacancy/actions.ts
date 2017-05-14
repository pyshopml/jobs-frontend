import { goBack } from 'react-router-redux';
import { INewVacancy } from 'interfaces';
import {uploadVacancy, fetchCategories, fetchKeywords} from './api';
import selectors from './selectors';
import { push } from 'react-router-redux';
import { addNotification } from "containers/Alert/actions";
import { Action } from 'interfaces';
import { SuccessNotification, WarningNotification } from 'models/Notification';

import {
  UPLOAD_VACANCY,
  UPLOAD_VACANCY_SUCCEEDED,
  UPLOAD_VACANCY_FAILURE,
  LOAD_CATEGORIES,
  LOAD_CATEGORIES_FAILED,
  LOAD_CATEGORIES_SUCCEEDED,
  LOAD_KEYWORDS_FAILED,
  LOAD_KEYWORDS,
  LOAD_KEYWORDS_SUCCEEDED
} from './constants';

const submitVacancy = (): Action => ({
  type: UPLOAD_VACANCY,
});

const submitVacancySucceeded = (createdVacancy): Action => ({
  type: UPLOAD_VACANCY_SUCCEEDED,
  data: { createdVacancy },
});

const submitVacancyFailed = (message: string): Action => ({
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


const loadingCategoriesSucceeded = (data) : Action => ({
  type: LOAD_CATEGORIES_SUCCEEDED,
  data
});

const loadingCategoriesFailed = (errorMessage: string) : Action => ({
  type: LOAD_CATEGORIES_FAILED,
  errorMessage
});

export const loadCategories = () => dispatch => {
  dispatch({ type: LOAD_CATEGORIES });
  fetchCategories(
    (data) => dispatch(loadingCategoriesSucceeded(data)),
    (msg : string) => dispatch(loadingCategoriesFailed(msg)),
  );
};

const loadingKeywordsSucceeded = (data) : Action => ({
  type: LOAD_KEYWORDS_SUCCEEDED,
  data
});

const loadingKeywordsFailed = (errorMessage: string) : Action => ({
  type: LOAD_KEYWORDS_FAILED,
  errorMessage
});

export const loadKeywords = () => dispatch => {
  dispatch({ type: LOAD_KEYWORDS });
  fetchKeywords(
    (data) => dispatch(loadingKeywordsSucceeded(data)),
    (msg : string) => dispatch(loadingKeywordsFailed(msg)),
  );
};

export const handleCancel = () => dispatch => dispatch(goBack());