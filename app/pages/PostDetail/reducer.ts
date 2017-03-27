import { fromJS } from 'immutable';
import PostClass from 'models/Post.class';
import {
  LOAD_POST,
  LOAD_POST_SUCCEEDED,
  LOAD_POST_FAILURE
} from './constants';

const initialModel = fromJS({
  openedPost: null,
});

export default (state = initialModel, action) => {
  switch (action.type) {

    case LOAD_POST_SUCCEEDED:
      const post = new PostClass(action.data.post);
      return state.set('openedPost', post);

    case LOAD_POST:
      return state.set('openedPost', null);

    default:
      return state;
  }
}