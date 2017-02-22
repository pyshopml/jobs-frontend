import {
  UPLOAD_POST,
  UPLOAD_POST_SUCCEEDED,
  UPLOAD_POST_FAILURE
} from './constants';

import IPost from '../../interfaces/ipost'

class InitialModel{
  public createdPost: IPost;
  constructor(options: { createdPost: IPost }){
    this.createdPost = options.createdPost
  }
}

const initialModel = new InitialModel({
  createdPost: null
})

export default (state = initialModel, action) => {
  switch (action.type) {
    case UPLOAD_POST:
      return state;

    case UPLOAD_POST_SUCCEEDED:
      return Object.assign({}, state, { createdPost: action.createdPost });

    default:
      return state;
  }
}