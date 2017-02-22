
import {
  UPLOAD_POST,
  UPLOAD_POST_SUCCEEDED,
  UPLOAD_POST_FAILURE
} from './constants';

import IPost from '../../interfaces/ipost'

const uploadimgPostSucceeded = (createdPost: IPost) => ({
  type: UPLOAD_POST_SUCCEEDED,
  createdPost
});

const uploadimgPostFailed = (message: string) => ({
  type: UPLOAD_POST_FAILURE,
  message
});

async function uploadPostToServer(dispatch, post: IPost) {
  try {
    const res = await fetch('');
    const createdPost = await res.json()
    dispatch(uploadimgPostSucceeded(createdPost));
  } catch (e) {
    dispatch(uploadimgPostFailed(e.message));
  }
}

export const createPost = (post: IPost) =>
  (dispatch) => {
    dispatch({ type: UPLOAD_POST });
    uploadPostToServer(dispatch, post);
  }