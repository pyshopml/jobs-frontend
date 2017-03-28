import * as React from 'react';

import PostClass from '../../../../models/Post.class';
import VacancyItem from '../VacancyItem';

import * as css from './style.scss';

interface Props {
  vacancies: Array<PostClass>
};

interface State {};

class VacancyList extends React.Component<Props, State> {

  renderVacancies() {
    return this.props.vacancies.map(item => 
      <VacancyItem key={item.id} vacancy={item} />);
  }

  render() {
    return (
      <section className={css.container}>
        { this.renderVacancies() }
      </section>
    );
  }
}

export default VacancyList;