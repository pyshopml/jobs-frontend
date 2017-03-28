import { fromJS } from 'immutable';
import { INotification } from 'interfaces';
import {
  ADD_NOTIFICATION,
  REMOVE_CURRENT_NOTIFICATION
} from './constants';

interface AlertState {
  notifications: Array<INotification>;
}

const initialModel = fromJS({
  notifications: new Array<INotification>(),
});

export default (state = initialModel, action) => {
  switch(action.type) {

    case ADD_NOTIFICATION:
      let notifications = state.get('notifications').push(action.notification);
      return state.set('notifications', notifications);

    case REMOVE_CURRENT_NOTIFICATION:
      return state.set('notifications', state.get('notifications').shift());

    default:
      return state;
  }
};