import { Action } from 'interfaces';
import { fetchPosts } from './api';

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

export const loadPosts = (pageNum: number) => dispatch => {
  dispatch({ type: LOAD_POSTS });
  fetchPosts(
    pageNum,
    (data) => dispatch(loadingSucceeded(Object.assign(data, { currentPage: pageNum }))),
    (msg : string) => dispatch(loadingFailed(msg)),
  );
};
