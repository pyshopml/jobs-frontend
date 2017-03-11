import PostClass from '../../models/Post.class';

import {
  LOAD_POST,
  LOAD_POST_SUCCEEDED,
  LOAD_POST_FAILURE
} from './constants';

const initialModel = {
  openedPost: null,
};

export default (state = initialModel, action) => {
  switch (action.type) {
    case LOAD_POST_SUCCEEDED:
      return Object.assign({}, state, {openedPost: action.data.post});
    case LOAD_POST:
      return Object.assign({}, state, {openedPost: null});
    default:
      return state;
  }
}