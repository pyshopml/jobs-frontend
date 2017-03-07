import IPost from '../../interfaces/ipost';
import { Action } from '../../interfaces/action';
import { replace } from 'react-router-redux'
import { fetchPost } from './api';
import {
  LOAD_POST,
  LOAD_POST_SUCCEEDED,
  LOAD_POST_FAILURE
} from './constants';

const loadingPostSucceeded = (post: IPost): Action => ({
  type: LOAD_POST_SUCCEEDED,
  data: { post }
});

const loadingPostFailed = (errorMessage: string): Action => ({
  type: LOAD_POST_FAILURE,
  errorMessage
});

export const loadPost = (id: number) =>
  (dispatch) => {
    dispatch({ type: LOAD_POST });
    fetchPost(
      id,
      (post) => dispatch(loadingPostSucceeded(post)),
      (msg) => dispatch(loadingPostFailed(msg)),
      () => dispatch(replace('404'))
    )
  };
