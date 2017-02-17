import React, { Component } from 'react'

import IPost from '../../interfaces/ipost';

import * as css from './style.scss';

interface Props{
  post: IPost
};
interface State{};

class Post extends Component<Props, State> {
  keywords = () => {
    return (<div className={css.tag}>none</div>)
  }
  render() {
    return (
      <section className={css.post}>
        <h3 className={css.title}>
          <a href="#">{this.props.post.title}</a>
        </h3>
        <span className={css.employer}>
          Employer
        </span>

        <div className={css.info}>
          <div className={css.tags}>
            {this.keywords()}
          </div>
          <span className={css.date}>
          {this.props.post.created_on.toDateString()}
        </span>
        </div>

      </section>
    );
  }
}

export default Post;