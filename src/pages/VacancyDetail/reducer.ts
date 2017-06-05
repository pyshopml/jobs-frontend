import { fromJS } from 'immutable';
import Vacancy from 'models/Vacancy';
import { LOCATION_CHANGE } from 'react-router-redux';
import {
  LOAD_VACANCY_PENDING,
  LOAD_VACANCY_REJECTED,
  LOAD_VACANCY_FULFILLED
} from './constants';

const initialModel = fromJS({
  openedVacancy: null,
  isLoading: true
});

export default (state = initialModel, action) => {
  switch (action.type) {
    case LOAD_VACANCY_PENDING:
      return state.set('isLoading', true);
      break;
    case LOAD_VACANCY_FULFILLED:
      const vacancy = new Vacancy(action.payload);
      return state.merge({openedVacancy: vacancy, isLoading: false});
      break;
    case LOAD_VACANCY_REJECTED:
      return state.set('isLoading', false);
      break;
    case LOCATION_CHANGE:
      return initialModel;
      break;
    default:
      return state;
  }
}