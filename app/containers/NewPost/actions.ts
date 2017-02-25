import { goBack } from 'react-router-redux';
import IPost from '../../interfaces/ipost';
import INewPost from '../../interfaces/inewpost';
import {
  UPLOAD_POST,
  UPLOAD_POST_SUCCEEDED,
  UPLOAD_POST_FAILURE
} from './constants';

const uploadimgPostSucceeded = (createdPost: IPost) => ({
  type: UPLOAD_POST_SUCCEEDED,
  createdPost
});

const uploadimgPostFailed = (message: string) => ({
  type: UPLOAD_POST_FAILURE,
  message
});

async function uploadPostToServer(dispatch, post: INewPost) {
  try {
    const headers = new Headers({"Content-Type": "application/json"});
    const res = await fetch("http://jobs.pyshop.ru/api/vacancies", {
      method: "POST",
      headers: headers,
      body: { ...post }
    });
    const createdPost = await res.json();
    dispatch(uploadimgPostSucceeded(createdPost));
  } catch (e) {
    dispatch(uploadimgPostFailed(e.message));
  }
}

export const createPost = (post: INewPost) =>
  (dispatch) => {
    dispatch({ type: UPLOAD_POST });
    // uploadPostToServer(dispatch, post);
    console.log(post);
  }

export const handleCancel = () => dispatch => {
  dispatch(goBack());
}