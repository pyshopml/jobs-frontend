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
import authReducer from '../Auth/reducer';

const appReducer = (state: any = {}, action) => {
  switch(action.type) {

    default:
      return state;
  }
};

export default (state: any = {}, action) => ({
  app: appReducer(state.app, action),
  home: homeReducer(state.home, action),
  posts: postsReducer(state.posts, action),
  newPost: newPostReducer(state.newPost, action),
	auth:authReducer(state.auth, action)
});