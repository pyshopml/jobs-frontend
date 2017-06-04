import * as React from 'react'
import { Pagination } from 'elemental';

import * as css from './style.scss';

interface Props {
  count: number;
  pageSize: number;
  currentPage: number;
  changePage: (pageNum: number) => void;
};

interface State {};

class Footer extends React.Component<Props, State> {

  handlePageSelect = (pageNumber) => {
    this.props.changePage(pageNumber);
  }

  render() {
    if( this.props.count/ this.props.pageSize > 1){ //If at least one page exist
      return (
        <Pagination
          className={css.container}
          currentPage={this.props.currentPage}
          onPageSelect={this.handlePageSelect}
          pageSize={this.props.pageSize}
          total={this.props.count}
          limit={10}
        />
      );
    } else return null;
  }
}

export default Footer;