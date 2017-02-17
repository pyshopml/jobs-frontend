import { createSelector } from 'reselect';

const postsSelectors = state => state.global.posts.allPosts;

export const getPosts = createSelector(
  postsSelectors,
  (posts) => {return posts}
);