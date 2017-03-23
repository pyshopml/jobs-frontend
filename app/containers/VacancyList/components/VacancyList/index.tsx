import * as React from 'react';

import PostClass from '../../../../models/Post.class';
import VacancyItem from '../VacancyItem';

import * as css from './style.scss';

interface Props {
  allPosts: Array<PostClass>
};

interface State {};

class PostList extends React.Component<Props, State> {

  renderPosts() {
    return this.props.allPosts.map(post => <VacancyItem key={post.id} post={post} />);
  }

  render() {
    return (
      <section className={css.container}>
        { this.renderPosts() }
      </section>
    );
  }
}

export default PostList;