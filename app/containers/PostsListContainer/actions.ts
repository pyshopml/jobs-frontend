
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

function retrieveData() {
  const headers = new Headers({
    'Accept': 'application/json',
    'Origin': 'http://localhost:3000/',
    // 'Access-Control-Request-Method': '*'
    // 'Access-Control-Allow-Origin': 'http://jobs.pyshop.ru',
    'Access-Control-Request-Method': 'GET',
   });

  const options = {
    method: 'GET',
    headers: headers,
    mode: 'no-cors'
  };

  return fetch('http://jobs.pyshop.ru/api/vacancies/', JSON.stringify(options)).then(res => res.json());
  // return fetch('http://jobs.pyshop.ru/api/vacancies/', { mode: 'no-cors' }).then(res => res.json());
}

async function loadPostsFromServer() {
  try {
    const res = await retrieveData();
    console.log(res);
  } catch (e) {

  }
}

/*
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
*/

export const loadStories = () => dispatch => {
  dispatch({ type: LOAD_POSTS });
  loadPostsFromServer();
}