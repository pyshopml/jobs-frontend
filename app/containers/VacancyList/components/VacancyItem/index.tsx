import * as React from 'react';

import PostClass from '../../../../models/Post.class';
import { Link } from 'react-router';

import * as css from './style.scss';;

interface Props {
  vacancy: PostClass
};

interface State {};

class VacancyItem extends React.Component<Props, State> {
  render() {
    const { vacancy } = this.props;

    return (
      <section className={css.container}>
        <h3 className={css.title}>
          <Link to={`vacancies/${vacancy.id}`}>{ vacancy.title }</Link>
        </h3>
        <span className={ css.description }>
          { vacancy.description }
        </span>
      </section>
    );
  }
}

export default VacancyItem;