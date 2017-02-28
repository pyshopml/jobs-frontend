import React, { Component } from 'react';

import IPost from '../../interfaces/ipost';

import PostsListSearchBar from '../PostsListSearchBar';
import PostsListHeader from '../PostsListHeader';
import Post from '../Post';

interface Props {
  allPosts: Array<IPost>
};

interface State {};

class Home extends Component<Props, State> {

  renderPosts() {
    return this.props.allPosts.map(post => <Post key={post.id} post={post} />);
  }

  render() {
    return (
      <section>
        <PostsListSearchBar />
        { /* <PostsListHeader resultLength={this.props.allPosts.length}/> */ }
        { this.renderPosts() }
      </section>
    );
  }
}

export default Home;