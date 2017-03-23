import { Action } from '../../interfaces/action';
import { fetchPosts } from './api';
import selectors from './selectors';

import {
  LOAD_POSTS,
  LOAD_POSTS_SUCCEEDED,
  LOAD_FAILED,
} from './constants';

const loadingStarted = () : Action => ({
  type: LOAD_POSTS
});

const loadingSucceeded = (data) : Action => ({
  type: LOAD_POSTS_SUCCEEDED,
  data
});

const loadingFailed = (errorMessage: string) : Action => ({
  type: LOAD_FAILED,
  errorMessage
});

export const loadPosts = () => dispatch => {
  dispatch({ type: LOAD_POSTS });
  fetchPosts(
    (data) => dispatch(loadingSucceeded(data)),
    (msg : string) => dispatch(loadingFailed(msg)),
  );
};
