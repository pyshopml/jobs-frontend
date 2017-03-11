import { goBack } from 'react-router-redux';
import INewPost from '../../interfaces/inewpost';
import PostClass from '../../models/Post.class'
import { uploadPost } from './api';
import selectors from './selectors';
import { ADD_NOTIFICATION } from "../App/constants";
import { Action } from '../../interfaces/action';
import {
  UPLOAD_POST,
  UPLOAD_POST_SUCCEEDED,
  UPLOAD_POST_FAILURE,
} from './constants';

const submitPost = (): Action => ({
  type: UPLOAD_POST,
});

const submitPostSucceeded = (post): Action => ({
  type: UPLOAD_POST_SUCCEEDED,
  data: {post},
});

const submitPostFailed = (message: string): Action => ({
  type: UPLOAD_POST_FAILURE,
  message
});

export const addNotification = (message: string): Action => ({
  type: ADD_NOTIFICATION,
  message
});

export const createPost = (post: INewPost) => (dispatch, getState) => {
  dispatch(submitPost());

  const state = selectors(getState())

  uploadPost(
    post,
    state.auth_token,
    (post: any) => dispatch(submitPostSucceeded(post)),
    (msg: string) => {
      dispatch(addNotification(msg));
      dispatch(submitPostFailed(msg))
    },
  )
}

export const handleCancel = () => dispatch => {
  dispatch(goBack());
}