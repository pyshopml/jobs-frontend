import  { ADD_NOTIFICATION, REMOVE_CURRENT_NOTIFICATION } from './constants';

const initialModel = {
  notifications: []
};

export default (state = initialModel, action) => {
  switch(action.type) {

    case ADD_NOTIFICATION:
      console.log(action)
      const notifications = state.notifications.slice();
      const newNotification = {
        ...action.notification,
        message: new String(action.notification.message)
      };
      notifications.push(newNotification);
      return Object.assign({}, state, {notifications});

    case REMOVE_CURRENT_NOTIFICATION:
      return Object.assign({}, state, {
        notifications: state.notifications.slice(1)
      });

    default:
      return state;
  }
};