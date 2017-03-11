import PostClass from '../../models/Post.class';
import {
  LOAD_POSTS,
  LOAD_POSTS_SUCCEEDED,
  LOAD_MORE_POSTS_SUCCEEDED,
  LOAD_FAILED,
} from './constants';


interface PostListState {
  allPosts: Array<PostClass>;
  errorMessage: string;
  nextPage: string;
}

const initialModel: PostListState = {
  allPosts: new Array<PostClass>(),
  errorMessage: '',
  nextPage: '',
};

export default (state = initialModel, action): PostListState => {
  switch (action.type) {
    case LOAD_POSTS:
      return state;

    case LOAD_POSTS_SUCCEEDED:
      const posts = action.data.results.map(result => new PostClass(result));
      return Object.assign(
        {},
        state,
        { allPosts: posts, nextPage: action.data.next }
      );

    case LOAD_MORE_POSTS_SUCCEEDED:
      return Object.assign(
        {},
        state,
        { allPosts: state.allPosts.concat(action.data.results), nextPage: action.data.next }
      );

    case LOAD_FAILED:
      return Object.assign({}, state, { errorMessage: action.errorMessage });

    default:
      return state;
  }
}