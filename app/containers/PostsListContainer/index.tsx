import React, { Component } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';

import selectors from './selectors';
import { loadPosts, loadMorePosts } from './actions';
import AddButton from '../../components/AddPostButton';

import PostsList from '../../components/PostsList';

interface Props {
  allPosts: any[];
  loadPosts(): void;
  loadMorePosts(): void;
};

interface State {};

class PostsListContainer extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.loadMore = this.loadMore.bind(this);
  }

  componentDidMount() {
    this.props.loadPosts();
    $(window).bind('scroll', this.loadMore);
  }

  componentWillUnmount() {
    $(window).unbind('scroll');
  }

  isBottom() {
    return ($(window).scrollTop() === $(document).height() - $(window).height());
  }

  loadMore() {
    if (this.isBottom()) this.props.loadMorePosts()
  }

  render() {
    return (
      <div>
        <PostsList { ...this.props } />
        <AddButton/>
      </div>
    );
  }
}

const mapStateToProps = state => selectors(state);

const mapDispatchToProps = dispatch => ({
  loadPosts: () => dispatch(loadPosts()),
  loadMorePosts: () => dispatch(loadMorePosts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostsListContainer);