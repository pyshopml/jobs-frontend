import { fromJS } from 'immutable';
import Vacancy from 'models/Vacancy';
import { LOCATION_CHANGE } from 'react-router-redux';
import {
  LOAD_VACANCY,
  LOAD_VACANCY_SUCCEEDED,
  LOAD_VACANCY_FAILURE
} from './constants';

const initialModel = fromJS({
  openedVacancy: null,
  isLoading: true
});

export default (state = initialModel, action) => {
  switch (action.type) {
    case LOAD_VACANCY:
      return state.set('isLoading', true);
      break;
    case LOAD_VACANCY_SUCCEEDED:
      const vacancy = new Vacancy(action.data.vacancy);
      return state.merge({openedVacancy: vacancy, isLoading: false});
      break;
    case LOAD_VACANCY_FAILURE:
      return state.set('isLoading', false);
      break;
    case LOCATION_CHANGE:
      return initialModel;
      break;
    default:
      return state;
  }
}