import { goBack } from 'react-router-redux';
import { INewPost } from 'interfaces';
import { uploadPost } from './api';
import selectors from './selectors';
import { push } from 'react-router-redux';
import { addNotification } from "containers/Alert/actions";
import { Action } from 'interfaces';
import { SuccessNotification, WarningNotification } from 'models/Notification';

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
  data: { createdPost },
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

      let notification = new SuccessNotification({
        message: 'Вакансия создана',
        label: 'Открыть',
        action: () => dispatch(push(`/vacancies/${post.id}`)),
       });

      dispatch(addNotification(notification));
      dispatch(submitPostSucceeded(post))
    },
    (msg: string) => {
      let notification = new WarningNotification({
        message: msg,
      });

      dispatch(addNotification(notification));
      dispatch(submitPostFailed(msg))
    },
  )
}

export const handleCancel = () => dispatch => dispatch(goBack());