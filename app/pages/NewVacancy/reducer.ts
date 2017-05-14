import { fromJS } from 'immutable';
import Vacancy from 'models/Vacancy';
import {
  UPLOAD_VACANCY,
  UPLOAD_VACANCY_SUCCEEDED,
  UPLOAD_VACANCY_FAILURE,
  LOAD_CATEGORIES,
  LOAD_CATEGORIES_SUCCEEDED,
  LOAD_CATEGORIES_FAILED,
  LOAD_KEYWORDS,
  LOAD_KEYWORDS_FAILED,
  LOAD_KEYWORDS_SUCCEEDED
} from './constants';

const initialModel = fromJS({
  createdVacancy: null,
  availableCategories: [],
  possibleKeywords: []
});

export default (state = initialModel, action) => {
  switch (action.type) {

    case UPLOAD_VACANCY:
      return state;

    case UPLOAD_VACANCY_SUCCEEDED:
      const createdVacancy = new Vacancy(action.data.createdVacancy);
      return state.set('createdVacancy', createdVacancy);

    case LOAD_CATEGORIES_SUCCEEDED:
      let categories = action.data.results;
      return state.set('availableCategories', categories);

    case LOAD_KEYWORDS_SUCCEEDED:
      let possibleKeywords = action.data.results;
      return state.set('possibleKeywords', possibleKeywords);

    default:
      return state;
  }
}