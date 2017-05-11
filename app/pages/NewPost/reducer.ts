import { fromJS } from 'immutable';
import PostClass from 'models/Post.class';
import {
  UPLOAD_POST,
  UPLOAD_POST_SUCCEEDED,
  UPLOAD_POST_FAILURE,
  LOAD_CATEGORIES,
  LOAD_CATEGORIES_SUCCEEDED,
  LOAD_CATEGORIES_FAILED
} from './constants';

interface NewPostModel {
  createdPost: PostClass;
  availableCategories: {title: string, id: number, parent: number}[];
}

const initialModel = fromJS({
  createdPost: null,
  availableCategories: [],
});

export default (state = initialModel, action) => {
  switch (action.type) {

    case UPLOAD_POST:
      return state;

    case UPLOAD_POST_SUCCEEDED:
      const createdPost = new PostClass(action.data.createdPost);
      return state.set('createdPost', createdPost);

    case LOAD_CATEGORIES_SUCCEEDED:
      let categories = action.data.results;
      return state.set('availableCategories', categories);

    default:
      return state;
  }
}