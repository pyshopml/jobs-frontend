import * as React from 'react';
import { connect } from 'react-redux';

import Vacancy from 'models/Vacancy';
import selectors from './selectors';
import { loadVacancies, updateSearchString } from './actions';

import VacancyList from './components/VacancyList';
import Pagination from './components/Footer';
import Search from './components/Search';
import debounce from 'tools/debounce';


interface Props {
  vacancies: Vacancy[];
  isLoggedIn: boolean;
  isLoading: boolean;
  loadVacancies(pageNum: number, searchString?: string): void;
  updateSearchString(searchString: string): void;
  searchString: string;
  count: number;
  pageSize: number;
  currentPage: number;
};


class Vacancies extends React.Component<Props, null> {
  constructor(props){
    super(props);
    this.updateVacancies = debounce(this.updateVacancies, 500);
  }

  componentDidMount() {
    this.updateVacancies();
  }

  updateVacancies = (page?: number) => {
    const currentPage = page || this.props.currentPage || 1;
    this.props.loadVacancies(currentPage, this.props.searchString);
  }

  handlePageChange = (pageNum: number) => {
    window.scrollTo(0, 0);
    this.updateVacancies(pageNum);
  };

  onSearchFieldChange = (val) => {
    this.props.updateSearchString(val);
    this.updateVacancies(1);
  };

  render() {
    const { vacancies, isLoading} = this.props;

    return (
      <article>
        <Search value={this.props.searchString} onChange={this.onSearchFieldChange}/>
        { isLoading && vacancies.length == 0 ? null : <VacancyList { ...this.props } /> }
        <Pagination {...this.props} changePage={ this.handlePageChange }  />
      </article>
    );
  }
}

const mapStateToProps = state => selectors(state);

const mapDispatchToProps = dispatch => ({
  loadVacancies: (pageNum: number, searchString?: string) => dispatch(loadVacancies(pageNum, searchString)),
  updateSearchString: (searchString: string) => dispatch(updateSearchString(searchString))
});

export default connect(mapStateToProps, mapDispatchToProps)(Vacancies);