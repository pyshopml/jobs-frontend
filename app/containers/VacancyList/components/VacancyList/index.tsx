import * as React from 'react';

import PostClass from '../../../../models/Post.class';
import VacancyItem from '../VacancyItem';

import * as css from './style.scss';

interface Props {
  vacancies: Array<PostClass>
};

interface State {};

class VacancyList extends React.Component<Props, State> {

  renderPosts() {
    return this.props.vacancies.map(post => <VacancyItem key={post.id} post={post} />);
  }

  render() {
    return (
      <section className={css.container}>
        { this.renderPosts() }
      </section>
    );
  }
}

export default VacancyList;