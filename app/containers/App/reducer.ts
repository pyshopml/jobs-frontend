/* ------------------------------------------------------------------------------
* AppReducer
*
* The reducer takes care of our data. 
* Using actions, we can change our application state.
* To add a new action, add it to the switch statement in the reducer function.
*
* Nick Luparev nikita.luparev@gmail.com
------------------------------------------------------------------------------- */
import homeReducer from '../Home/reducer';
import postsReducer from '../PostsListContainer/reducer';
import newPostReducer from '../NewPost/reducer';

import  { ADD_NOTIFICATION, REMOVE_FIRST_NOTIFICATION } from './constants';

const initialModel = {
  notifications: []
};

const appReducer = (state = initialModel, action) => {
  switch(action.type) {

    case ADD_NOTIFICATION:
      const notifications = state.notifications.slice();
      notifications.push([action.message]);
      return Object.assign({}, state, {notifications});

    case REMOVE_FIRST_NOTIFICATION:
      return Object.assign({}, state, {
        notifications: state.notifications.slice(1)
      });

    default:
      return state;
  }
};

export default (state: any = {}, action) => ({
  app: appReducer(state.app, action),
  home: homeReducer(state.home, action),
  posts: postsReducer(state.posts, action),
  newPost: newPostReducer(state.newPost, action)
});