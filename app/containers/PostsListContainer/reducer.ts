import { pick } from 'ramda';
import PostClass from '../../models/Post.class';
import {
  LOAD_POSTS,
  LOAD_POSTS_SUCCEEDED,
  LOAD_FAILED,
} from './constants';


interface PostListState {
  allPosts: Array<PostClass>;
  errorMessage: string;
  count: number;
  currentPage: number;
  next: string;
  previous: string;
  pageSize: number;
}

const initialModel: PostListState = {
  allPosts: new Array<PostClass>(),
  errorMessage: '',
  count: 0,
  currentPage: 1,
  next: '',
  previous: '',
  pageSize: 20,
};

export default (state = initialModel, action): PostListState => {
  switch (action.type) {
    case LOAD_POSTS:
      return state;

    case LOAD_POSTS_SUCCEEDED:
      let posts = action.data.results.map(result => new PostClass(result));

      return Object.assign(
        {},
        state,
        pick(['count', 'next', 'previous'], action.data),
        { allPosts: posts }
      );

    case LOAD_FAILED:
      return Object.assign({}, state, { errorMessage: action.errorMessage });

    default:
      return state;
  }
}