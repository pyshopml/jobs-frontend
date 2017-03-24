import { fromJS, Map } from 'immutable';
import { pick } from 'ramda';
import PostClass from '../../models/Post.class';
import {
  LOAD_POSTS,
  LOAD_POSTS_SUCCEEDED,
  LOAD_FAILED,
} from './constants';


interface PostListState {
  vacancies: Array<PostClass>;
  errorMessage: string;
  count: number;
  currentPage: number;
  next: string;
  previous: string;
  pageSize: number;
}

const initialModel = fromJS({
  vacancies: new Array<PostClass>(),
  errorMessage: '',
  count: 0,
  currentPage: 1,
  next: '',
  previous: '',
  pageSize: 20,
});

export default (state = initialModel, action) => {
  switch (action.type) {
    case LOAD_POSTS:
      return state;

    case LOAD_POSTS_SUCCEEDED:
      let posts = action.data.results.map(result => new PostClass(result));

      return state
        .set('vacancies', posts)
        .merge(pick(['count', 'next', 'previous', 'currentPage'], action.data));

    case LOAD_FAILED:
      return state.set('errorMessage', action.errorMessage);

    default:
      return state;
  }
}