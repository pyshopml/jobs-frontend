import * as React from 'react';

import PostClass from '../../../../models/Post.class';
import Post from '../PostItem';

import * as css from './style.scss';

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
      <section className={css.container}>
        { this.renderPosts() }
      </section>
    );
  }
}

export default PostList;