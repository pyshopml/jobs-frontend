import { Action } from '../../interfaces/action';
import { loadPostsFromServer } from './api';

import {
  LOAD_POSTS,
  LOAD_POSTS_SUCCEEDED,
  LOAD_POSTS_FAILURE
} from './constants';

const loadingStarted = () : Action => ({
  type: LOAD_POSTS
});

const loadingSucceeded = (data) : Action => ({
  type: LOAD_POSTS_SUCCEEDED,
  data
});

const loadingFailed = (errorMessage: string) : Action => ({
  type: LOAD_POSTS_FAILURE,
  errorMessage
});

export const loadPosts = () => dispatch => {
  dispatch({ type: LOAD_POSTS });
  loadPostsFromServer(
    (data) => dispatch(loadingSucceeded(data)),
    (msg : string) => dispatch(loadingFailed(msg)),
  );
}

export const loadMorePosts = () => dispatch => {
  console.log('LOAD MORE !!! YARGHHH');
}