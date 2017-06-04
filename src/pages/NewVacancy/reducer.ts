import { fromJS } from 'immutable';
import Vacancy from 'models/Vacancy';
import {
  UPLOAD_VACANCY,
  UPLOAD_VACANCY_SUCCEEDED,
  LOAD_CITIES_SUCCEEDED,
  LOAD_COUNTRIES_SUCCEEDED,
  LOAD_CATEGORIES_SUCCEEDED,
  LOAD_KEYWORDS_SUCCEEDED
} from './constants';

const initialModel = fromJS({
  createdVacancy: null,
  availableCategories: [],
  autocompleteKeywords: [],
  autocompleteCities: [],
  autocompleteCountries: [],
});

export default (state = initialModel, action) => {
  switch (action.type) {

    case UPLOAD_VACANCY:
      return state;

    case UPLOAD_VACANCY_SUCCEEDED:
      const createdVacancy = new Vacancy(action.data.createdVacancy);
      return state.set('createdVacancy', createdVacancy);

    case LOAD_CITIES_SUCCEEDED:
      return state.set('autocompleteCities', action.data.results);

    case LOAD_COUNTRIES_SUCCEEDED:
      return state.set('autocompleteCountries', action.data.results);

    case LOAD_KEYWORDS_SUCCEEDED:
      return state.set('autocompleteKeywords', action.data.results);

    case LOAD_CATEGORIES_SUCCEEDED:
      return state.set('availableCategories', action.data.results);

    default:
      return state;
  }
}