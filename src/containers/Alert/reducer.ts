import { fromJS } from 'immutable';
import {
  ADD_NOTIFICATION,
  REMOVE_CURRENT_NOTIFICATION
} from './constants';

const initialModel = fromJS({
  notifications: [],
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