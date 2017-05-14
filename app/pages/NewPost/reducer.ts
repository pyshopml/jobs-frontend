import { fromJS } from 'immutable';
import Vacancy from 'models/Vacancy';
import {
  UPLOAD_POST,
  UPLOAD_POST_SUCCEEDED,
  UPLOAD_POST_FAILURE,
  LOAD_CATEGORIES,
  LOAD_CATEGORIES_SUCCEEDED,
  LOAD_CATEGORIES_FAILED,
  LOAD_KEYWORDS,
  LOAD_KEYWORDS_FAILED,
  LOAD_KEYWORDS_SUCCEEDED
} from './constants';

interface NewPostModel {
  createdPost: Vacancy;
  possibleKeywords: string[];
  availableCategories: {title: string, id: number, parent: number}[];
}

const initialModel = fromJS({
  createdPost: null,
  availableCategories: [],
  possibleKeywords: []
});

export default (state = initialModel, action) => {
  switch (action.type) {

    case UPLOAD_POST:
      return state;

    case UPLOAD_POST_SUCCEEDED:
      const createdPost = new Vacancy(action.data.createdPost);
      return state.set('createdPost', createdPost);

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