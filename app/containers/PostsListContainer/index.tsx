import * as React from 'react';
import { connect } from 'react-redux';

import PostClass from '../../models/Post.class';
import selectors from './selectors';
import { loadPosts } from './actions';

import AddButton from './components/AddPostButton';
import PostsList from './components/PostsList';
import Pagination from './components/Footer';

interface Props {
  allPosts: PostClass[];
  isLoggedIn: boolean;
  loadPosts(): void;
  count: number;
  pageSize: number;
  currentPage: number;
};

interface State {};

class PostsListContainer extends React.Component<Props, State> {
  componentDidMount() {
    this.props.loadPosts();
  }

  handlePageChange = (pageNum: number) => {
    console.log(pageNum);
  }

  render() {
    return (
      <article>
        <PostsList { ...this.props } />
        <Pagination {...this.props} changePage={ this.handlePageChange }  />
        { this.props.isLoggedIn ? <AddButton/> : '' }
      </article>
    );
  }
}

const mapStateToProps = state => selectors(state);

const mapDispatchToProps = dispatch => ({
  loadPosts: () => dispatch(loadPosts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostsListContainer);