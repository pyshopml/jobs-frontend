import {
  ADD_NOTIFICATION,
  REMOVE_CURRENT_NOTIFICATION
} from './constants';
import INotification from "../../interfaces/inotification";

export const addNotification = (notification: INotification) => (
  (dispatch) => {
    dispatch({
      type: ADD_NOTIFICATION,
      notification
    })
  }
);

export const removeFirstNotification = () => dispatch => {
  dispatch({
    type: REMOVE_CURRENT_NOTIFICATION
  })
};