import { fromJS } from 'immutable';
import { pick } from 'ramda';
import Vacancy from 'models/Vacancy';
import {
  LOAD_VACANCIES_PENDING, LOAD_VACANCIES_FULFILLED, LOAD_VACANCIES_REJECTED,
  UPDATE_SEARCH_STRING,
} from './constants';


const initialModel = fromJS({
  vacancies: [],
  isLoading: true,
  searchString: '',
  errorMessage: '',
  count: 0,
  currentPage: 1,
  next: '',
  previous: '',
  pageSize: 20,
});

export default (state = initialModel, action) => {

  switch (action.type) {

    case LOAD_VACANCIES_PENDING:
      return state.set('isLoading', true);

    case LOAD_VACANCIES_FULFILLED:
      let vacancies = action.payload.results.map(result => new Vacancy(result));

      return state
        .set('vacancies', vacancies)
        .set('isLoading', false)
        .set('currentPage', action.meta.currentPage)
        .merge(pick(['count', 'next', 'previous'], action.payload));

    case UPDATE_SEARCH_STRING:
      return state.set('searchString', action.data);

    case LOAD_VACANCIES_REJECTED:
      return state.set('errorMessage', action.payload)
                  .set('isLoading', false);

    default:
      return state;
  }
}