import { fromJS } from 'immutable';
import PostClass from '../../models/Post.class';
import {
  UPLOAD_POST,
  UPLOAD_POST_SUCCEEDED,
  UPLOAD_POST_FAILURE
} from './constants';

interface NewPostModel {
  createdPost: PostClass;
}

const initialModel = fromJS({
  createdPost: null,
});

export default (state = initialModel, action) => {
  switch (action.type) {

    case UPLOAD_POST:
      return state;

    case UPLOAD_POST_SUCCEEDED:
      const createdPost = new PostClass(action.data.createdPost);
      return state.set('createdPost', createdPost);

    default:
      return state;
  }
}