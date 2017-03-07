import { goBack } from 'react-router-redux';
import IPost from '../../interfaces/ipost';
import INewPost from '../../interfaces/inewpost';
import { uploadPost } from './api';
import selectors from './selectors';


import {
  UPLOAD_POST,
  UPLOAD_POST_SUCCEEDED,
  UPLOAD_POST_FAILURE,
} from './constants';
import { ADD_NOTIFICATION } from "../App/constants";

const uploadimgPostSucceeded = (createdPost: IPost) => ({
  type: UPLOAD_POST_SUCCEEDED,
  createdPost
});

const uploadimgPostFailed = (message: string) =>
  (dispatch) => {
    dispatch({
      type: UPLOAD_POST_FAILURE,
      message
    })
  };

export const createPost = (post: INewPost) =>
  (dispatch, getState) => {
    dispatch({ type: UPLOAD_POST });
    const state = selectors(getState())
    uploadPost(
      post,
      state.auth_token,
      (post) => dispatch(uploadimgPostSucceeded(post)),
      (msg) => {
        dispatch(addNotification(msg));
        dispatch(uploadimgPostFailed(msg))
      },
    )
  }

export const addNotification = (message) =>
  (dispatch) => {
    dispatch({
      type: ADD_NOTIFICATION,
      message
    });
  };
export const handleCancel = () => dispatch => {
  dispatch(goBack());
}