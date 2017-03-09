import {
  UPLOAD_POST,
  UPLOAD_POST_SUCCEEDED,
  UPLOAD_POST_FAILURE
} from './constants';

import IPost from '../../interfaces/ipost'

interface NewPostModel {
  createdPost: any;
}

const initialModel: NewPostModel = {
  createdPost: null,
};

export default (state = initialModel, action):NewPostModel => {
  switch (action.type) {

    case UPLOAD_POST:
      return state;

    case UPLOAD_POST_SUCCEEDED:
      return Object.assign({}, state, { createdPost: action.data });

    default:
      return state;
  }
}