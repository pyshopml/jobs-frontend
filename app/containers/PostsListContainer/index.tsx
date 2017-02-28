import React, { Component } from 'react';
import { connect } from 'react-redux';

import selectors from './selectors';
import { loadStories } from './actions';

import PostsList from '../../components/PostsList';

interface Props {
  allPosts: any[],
  loadStories(): void,
};

interface State {};

class PostsListContainer extends Component<Props, State> {
  componentDidMount() {
    this.props.loadStories();
  }

  render() {
    return (<PostsList { ...this.props } />);
  }
}

const mapStateToProps = state => selectors(state);

const mapDispatchToProps = dispatch => ({
  loadStories: () => dispatch(loadStories())
});

export default connect(mapStateToProps, mapDispatchToProps)(PostsListContainer);