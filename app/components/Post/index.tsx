import React, { Component } from 'react'

import IPost from '../../interfaces/ipost';

import css from './style.scss';

interface Props{
  post: IPost
};

interface State {};

class Post extends Component<Props, State> {
  render() {
    const { post } = this.props;

    return (
      <section className={css.post}>
        <h3 className={css.title}>
          <a href="#">{ post.title }</a>
        </h3>
        <span className={ css.description }>
          { post.description }
        </span>
      </section>
    );
  }
}

export default Post;