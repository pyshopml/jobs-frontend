import { createSelector } from 'reselect';

const createdPostSelectors = state => state.global.newPost.createdPost;

export const getCreatedPost = createSelector(
  createdPostSelectors,
  (createdPost) => {return createdPost}
);