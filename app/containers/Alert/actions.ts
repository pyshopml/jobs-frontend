import {
  ADD_NOTIFICATION,
  REMOVE_CURRENT_NOTIFICATION
} from './constants';
import INotification from "../../interfaces/inotification";
import { Action } from '../../interfaces/action';

const formNotification = (notification: INotification) => ({
  type: ADD_NOTIFICATION,
  notification,
});

const clearFirstNotification = (): Action => ({
  type: REMOVE_CURRENT_NOTIFICATION
});


export const addNotification = (notification: INotification) => dispatch =>
  dispatch(formNotification(notification));

export const removeFirstNotification = () => dispatch =>
  dispatch(clearFirstNotification());
