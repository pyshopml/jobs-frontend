import React, { Component } from 'react'

import PostClass from '../../models/Post.class';
import { Link } from 'react-router';

import css from './style.scss';

interface Props{
  post: PostClass
};

interface State {};

class Post extends Component<Props, State> {
  render() {
    const { post } = this.props;

    return (
      <section className={css.post}>
        <h3 className={css.title}>
          <Link to={`vacancies/ ${this.props.post.id}`}>
            { post.title }
          </Link>
        </h3>
        <span className={ css.description }>
          { post.description }
        </span>
      </section>
    );
  }
}

export default Post;