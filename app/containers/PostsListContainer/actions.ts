import { Action } from '../../interfaces/action';

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

function retrieveData() {
  const options = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  };

  return fetch('http://jobs.pyshop.ru/api/vacancies/', options).then(res => res.json());
}

async function loadPostsFromServer(dispatch: (action : Action) => void) {
  try {
    const res = await retrieveData();
    
    dispatch(loadingSucceeded(res));
  } catch (e) {
    dispatch(loadingFailed(e.message));
  }
}

export const loadPosts = () => dispatch => {
  dispatch({ type: LOAD_POSTS });
  loadPostsFromServer(dispatch);
}

export const loadMorePosts = () => dispatch => {
  
}