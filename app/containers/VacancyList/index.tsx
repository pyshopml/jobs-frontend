import * as React from 'react';
import { connect } from 'react-redux';

import PostClass from '../../models/Post.class';
import selectors from './selectors';
import { loadPosts } from './actions';

import Vacancies from './components/VacancyList';
import Pagination from './components/Footer';

interface Props {
  vacancies: PostClass[];
  isLoggedIn: boolean;
  loadPosts(pageNum: number): void;
  count: number;
  pageSize: number;
  currentPage: number;
};

interface State {};

class VacancyList extends React.Component<Props, State> {
  componentDidMount() {
    this.props.loadPosts(1);
  }

  handlePageChange = (pageNum: number) => {
    window.scrollTo(0, 0);
    this.props.loadPosts(pageNum);
  }

  render() {
    return (
      <article>
        <Vacancies { ...this.props } />
        <Pagination {...this.props} changePage={ this.handlePageChange }  />
      </article>
    );
  }
}

const mapStateToProps = state => selectors(state);

const mapDispatchToProps = dispatch => ({
  loadPosts: (pageNum: number) => dispatch(loadPosts(pageNum)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VacancyList);