
import {
  LOAD_POSTS,
  LOAD_POSTS_SUCCEEDED,
  LOAD_POSTS_FAILURE
} from './constants';

const loadingSucceeded = (posts) => ({
  type: LOAD_POSTS_SUCCEEDED,
  posts
});

const loadingFailed = (message: string) => ({
  type: LOAD_POSTS_FAILURE,
  message
});

async function loadStoriesFromServer(dispatch) {
  try {
    const res = await fetch('http://d8d2a038.ngrok.io/vacancies/?format=json');
    let posts = await res.json()
    posts = posts.map(post => {
      post.created_on = new Date(post.created_on);
      return post
    });
    dispatch(loadingSucceeded(posts));
  } catch (e) {
    dispatch(loadingFailed(e.message));
  }
}

export const loadStories = () =>
  (dispatch) => {
    dispatch({ type: LOAD_POSTS });
    loadStoriesFromServer(dispatch);
  }