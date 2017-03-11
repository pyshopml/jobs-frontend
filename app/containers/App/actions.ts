import { goBack } from 'react-router-redux';
import {
  ADD_NOTIFICATION,
  REMOVE_FIRST_NOTIFICATION
} from './constants';

export const addNotification = (message) => (
  (dispatch) => {
    dispatch({
      type: ADD_NOTIFICATION,
      message
    })
  }
);

export const removeFirstNotification = () => dispatch => {
  dispatch({
    type: REMOVE_FIRST_NOTIFICATION
  })
};