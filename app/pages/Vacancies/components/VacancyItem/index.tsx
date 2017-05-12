import * as React from 'react';

import PostClass from '../../../../models/Post.class';
import { Link } from 'react-router';

import * as css from './style.scss';

interface Props {
  vacancy: PostClass
};

interface State {};

class VacancyItem extends React.Component<Props, State> {
  renderKeywords = () => {
    const { vacancy: {keywords} } = this.props;

    return keywords.map((keyword, i) => <span key={i} className={css.keyword}>{keyword}</span>)
  }
  render() {
    const {
      id,
      title,
      created_on,
      salary_text,
      keywords,
      busyness_text,
      location_text
    } = this.props.vacancy;

    return (
      <section className={css.container}>
        <div className={css.info}>
          <h3 className={css.title}>
            <Link to={`vacancies/${id}`}>{ title }</Link>
          </h3>
          {keywords.length > 0 ? <div className={css.keywords}>{this.renderKeywords()}</div> : null}
          {busyness_text ? <span className={css.busyness}>{busyness_text}</span> : null}
          {location_text ? <span className={css.location}>{location_text}</span> : null}
          {salary_text ? <span className={css.salary}>{salary_text}</span> : null}
        </div>
        <span className={css.date}>{created_on}</span>
      </section>
    );
  }
}

export default VacancyItem;