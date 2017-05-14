import { fromJS } from 'immutable';
import { pick } from 'ramda';
import Vacancy from 'models/Vacancy';
import {
  LOAD_VACANCIES,
  LOAD_VACANCIES_SUCCEEDED,
  LOAD_VACANCIES_FAILED,
} from './constants';


const initialModel = fromJS({
  vacancies: new Array<Vacancy>(),
  errorMessage: '',
  count: 0,
  currentPage: 1,
  next: '',
  previous: '',
  pageSize: 20,
});

export default (state = initialModel, action) => {
  switch (action.type) {
    case LOAD_VACANCIES:
      return state;

    case LOAD_VACANCIES_SUCCEEDED:
      let vacancies = action.data.results.map(result => new Vacancy(result));

      return state
        .set('vacancies', vacancies)
        .merge(pick(['count', 'next', 'previous', 'currentPage'], action.data));

    case LOAD_VACANCIES_FAILED:
      return state.set('errorMessage', action.errorMessage);

    default:
      return state;
  }
}