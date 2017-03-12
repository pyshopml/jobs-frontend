import PostClass from '../../models/Post.class';
import {
  UPLOAD_POST,
  UPLOAD_POST_SUCCEEDED,
  UPLOAD_POST_FAILURE
} from './constants';


interface NewPostModel {
  createdPost: PostClass;
}

const initialModel: NewPostModel = {
  createdPost: null,
};

export default (state: NewPostModel = initialModel, action):NewPostModel => {
  switch (action.type) {

    case UPLOAD_POST:
      return state;

    case UPLOAD_POST_SUCCEEDED:
      const createdPost = new PostClass(action.data.createdPost);
      return Object.assign({}, state, { createdPost: createdPost });

    default:
      return state;
  }
}