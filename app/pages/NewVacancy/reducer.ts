import { fromJS } from 'immutable';
import Vacancy from 'models/Vacancy';
import {
  UPLOAD_VACANCY,
  UPLOAD_VACANCY_SUCCEEDED,
  LOAD_FIELDS_VALUES_SUCCEEDED
} from './constants';

const initialModel = fromJS({
  createdVacancy: null,
  availableCategories: [],
  possibleKeywords: [],
  possibleCities: [],
  possibleCountries: [],
});

export default (state = initialModel, action) => {
  switch (action.type) {

    case UPLOAD_VACANCY:
      return state;

    case UPLOAD_VACANCY_SUCCEEDED:
      const createdVacancy = new Vacancy(action.data.createdVacancy);
      return state.set('createdVacancy', createdVacancy);

    case LOAD_FIELDS_VALUES_SUCCEEDED:
      const { data } = action;

      return state.set('availableCategories', data.categories.results)
                  .set('possibleCities', data.cities.results)
                  .set('possibleCountries', data.countries.results)
                  .set('possibleKeywords', data.keywords.results);

    default:
      return state;
  }
}