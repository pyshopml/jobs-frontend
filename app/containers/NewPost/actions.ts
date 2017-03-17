import { goBack } from 'react-router-redux';
import INewPost from '../../interfaces/inewpost';
import { uploadPost } from './api';
import selectors from './selectors';
import { push } from 'react-router-redux';
import { addNotification } from "../Alert/actions";
import { Action } from '../../interfaces/action';
import {
  UPLOAD_POST,
  UPLOAD_POST_SUCCEEDED,
  UPLOAD_POST_FAILURE,
} from './constants';

const submitPost = (): Action => ({
  type: UPLOAD_POST,
});

const submitPostSucceeded = (createdPost): Action => ({
  type: UPLOAD_POST_SUCCEEDED,
  data: {createdPost},
});

const submitPostFailed = (message: string): Action => ({
  type: UPLOAD_POST_FAILURE,
  message
});


export const createPost = (post: INewPost) => (dispatch, getState) => {
  dispatch(submitPost());

  const state = selectors(getState())

  uploadPost(
    post,
    state.auth_token,
    (post: any) => {
      dispatch(addNotification({
        message: 'Вакансия создана',
        type: 'normal',
        hideDuration: 5000,
        action: {
          label: 'Открыть',
          onClick: () => {
            dispatch(push(`/vacancies/${post.id}`))
          }
        }
      }));
      dispatch(submitPostSucceeded(post))
    },
    (msg: string) => {
      dispatch(addNotification({
        message: msg,
        type: 'warning'
      }));
      dispatch(submitPostFailed(msg))
    },
  )
}

export const handleCancel = () => dispatch => dispatch(goBack());