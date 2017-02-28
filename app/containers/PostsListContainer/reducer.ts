import {
  LOAD_POSTS,
  LOAD_POSTS_SUCCEEDED,
  LOAD_POSTS_FAILURE
} from './constants';

import IPost from '../../interfaces/ipost'

const initialModel = {
  allPosts: new Array<IPost>(),
  errorMessage: '',
};

export default (state = initialModel, action) => {
  switch (action.type) {
    case LOAD_POSTS:
      return state;

    case LOAD_POSTS_SUCCEEDED:
      return Object.assign({}, state, { allPosts: action.data.results });

    default:
      return state;
  }
}