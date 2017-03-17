import INotification from '../../interfaces/inotification';
import {
  ADD_NOTIFICATION,
  REMOVE_CURRENT_NOTIFICATION
} from './constants';

interface AlertState {
  notifications: Array<INotification>;
}

const initialModel: AlertState = {
  notifications: new Array<INotification>(),
};

export default (state = initialModel, action): AlertState => {
  switch(action.type) {

    case ADD_NOTIFICATION:
      console.log(action)

      // const notifications = state.notifications.slice();

      const newNotification = {
        ...action.notification,
        message: new String(action.notification.message)
      };

      // notifications.push(newNotification);
      return Object.assign({}, state, { notifications: [...state.notifications, newNotification] });

    case REMOVE_CURRENT_NOTIFICATION:
      return Object.assign({}, state, {
        notifications: state.notifications.slice(1)
      });

    default:
      return state;
  }
};