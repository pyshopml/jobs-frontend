import * as React from 'react';

import PostClass from '../../models/Post.class';

import PostsListSearchBar from '../PostsListSearchBar';
import PostsListHeader from '../PostsListHeader';
import Post from '../Post';

interface Props {
  allPosts: Array<PostClass>
};

interface State {};

class PostList extends React.Component<Props, State> {

  renderPosts() {
    return this.props.allPosts.map(post => <Post key={post.id} post={post} />);
  }

  render() {
    return (
      <section>
        { /* <PostsListSearchBar /> */ }
        { /* <PostsListHeader resultLength={this.props.allPosts.length}/> */ }
        { this.renderPosts() }
      </section>
    );
  }
}

export default PostList;