import { Action } from '../../interfaces/action';
import { loadPostsFromServer, fetchMorePosts } from './api';
import selectors from './selectors';

import {
  LOAD_POSTS,
  LOAD_POSTS_SUCCEEDED,
  LOAD_MORE_POSTS,
  LOAD_MORE_POSTS_SUCCEEDED,
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

const loadingMorePosts = () : Action => ({
  type: LOAD_MORE_POSTS,
});

const loadingMorePostsSucceeded = (data) : Action => ({
  type: LOAD_MORE_POSTS_SUCCEEDED,
  data,
});

const loadingMorePostsFailed = (errorMessage) : Action => ({
  type: LOAD_FAILED,
  errorMessage,
});

export const loadPosts = () => dispatch => {
  dispatch({ type: LOAD_POSTS });
  loadPostsFromServer(
    (data) => dispatch(loadingSucceeded(data)),
    (msg : string) => dispatch(loadingFailed(msg)),
  );
}

export const loadMorePosts = () => (dispatch, getState) => {
  const state = selectors(getState());
  dispatch(loadingMorePosts())
  fetchMorePosts(
    state.nextPage,
    (data) => dispatch(loadingMorePostsSucceeded(data)),
    (msg: string) => dispatch(loadingMorePostsFailed(msg)),
  );
}