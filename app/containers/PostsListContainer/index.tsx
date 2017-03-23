import * as React from 'react';
import { connect } from 'react-redux';

import PostClass from '../../models/Post.class';
import selectors from './selectors';
import { loadPosts, loadMorePosts } from './actions';

import AddButton from './components/AddPostButton';
import PostsList from './components/PostsList';

interface Props {
  allPosts: PostClass[];
  isLoggedIn: boolean;
  loadPosts(): void;
  loadMorePosts(): void;
};

interface State {};

class PostsListContainer extends React.Component<Props, State> {
  componentDidMount() {
    this.props.loadPosts();
  }

  render() {
    return (
      <article>
        <PostsList { ...this.props } />
        { this.props.isLoggedIn ? <AddButton/> : '' }
      </article>
    );
  }
}

const mapStateToProps = state => selectors(state);

const mapDispatchToProps = dispatch => ({
  loadPosts: () => dispatch(loadPosts()),
  loadMorePosts: () => dispatch(loadMorePosts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostsListContainer);