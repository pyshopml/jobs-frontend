import * as React from 'react';

import PostClass from '../../../../models/Post.class';
import Post from '../PostItem';

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
        { this.renderPosts() }
      </section>
    );
  }
}

export default PostList;