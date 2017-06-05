import { fromJS } from 'immutable';
import Vacancy from 'models/Vacancy';
import {
  UPLOAD_VACANCY_FULFILLED,
  UPLOAD_VACANCY_PENDING,
  LOAD_CITIES_FULFILLED,
  LOAD_COUNTRIES_FULFILLED,
  LOAD_CATEGORIES_FULFILLED,
  LOAD_KEYWORDS_FULFILLED
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

    case UPLOAD_VACANCY_PENDING:
      return state;

    case UPLOAD_VACANCY_FULFILLED:
      const createdVacancy = new Vacancy(action.payload.createdVacancy);
      return state.set('createdVacancy', createdVacancy);

    case LOAD_CITIES_FULFILLED:
      return state.set('autocompleteCities', action.payload.results);

    case LOAD_COUNTRIES_FULFILLED:
      return state.set('autocompleteCountries', action.payload.results);

    case LOAD_KEYWORDS_FULFILLED:
      return state.set('autocompleteKeywords', action.payload.results);

    case LOAD_CATEGORIES_FULFILLED:
      return state.set('availableCategories', action.payload.results);

    default:
      return state;
  }
}