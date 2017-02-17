import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getPosts } from './selectors';
import { loadStories } from './actions';

import PostsList from '../../components/PostsList';

interface Props{
  posts: any[],
  loadStories(): void
};
interface State{};

class PostsListContainer extends Component<Props, State> {
  render() {
    return (
      <div>
        <PostsList posts={this.props.posts}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  posts: getPosts(state)
});

const mapDispatchToProps = (dispatch) => ({
  loadStories: () => dispatch(loadStories())
});

export default connect(mapStateToProps, mapDispatchToProps)(PostsListContainer);