import * as React from 'react';
import { connect } from 'react-redux';

import Vacancy from 'models/Vacancy';
import selectors from './selectors';
import { loadVacancies } from './actions';

import VacancyList from './components/VacancyList';
import Pagination from './components/Footer';

interface Props {
  vacancies: Vacancy[];
  isLoggedIn: boolean;
  loadVacancies(pageNum: number): void;
  count: number;
  pageSize: number;
  currentPage: number;
};

interface State {};

class Vacancies extends React.Component<Props, State> {
  componentDidMount() {
    this.props.loadVacancies(1);
  }

  handlePageChange = (pageNum: number) => {
    window.scrollTo(0, 0);
    this.props.loadVacancies(pageNum);
  }

  render() {
    return (
      <article>
        <VacancyList { ...this.props } />
        <Pagination {...this.props} changePage={ this.handlePageChange }  />
      </article>
    );
  }
}

const mapStateToProps = state => selectors(state);

const mapDispatchToProps = dispatch => ({
  loadVacancies: (pageNum: number) => dispatch(loadVacancies(pageNum)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Vacancies);