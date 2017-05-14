import { fromJS } from 'immutable';
import Vacancy from 'models/Vacancy';
import { LOCATION_CHANGE } from 'react-router-redux';
import {
  LOAD_POST,
  LOAD_POST_SUCCEEDED,
  LOAD_POST_FAILURE
} from './constants';

const initialModel = fromJS({
  openedPost: null,
  isLoading: true
});

export default (state = initialModel, action) => {
  switch (action.type) {
    case LOAD_POST:
      return state.set('isLoading', true);
      break;
    case LOAD_POST_SUCCEEDED:
      const post = new Vacancy(action.data.post);
      return state.merge({openedPost: post, isLoading: false});
      break;
    case LOAD_POST_FAILURE:
      return state.set('isLoading', false);
      break;
    case LOCATION_CHANGE:
      return initialModel;
      break;
    default:
      return state;
  }
}