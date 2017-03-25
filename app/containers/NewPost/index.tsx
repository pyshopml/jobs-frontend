import * as React from 'react';
import { Card } from 'elemental';
import { connect } from 'react-redux';

import PostClass from '../../models/Post.class';
import INewPost from '../../interfaces/inewpost';
import NewPostForm from '../../components/NewPostForm';
import { createPost, handleCancel } from './actions';
import selectors from './selectors';

import * as css from './style.scss';

interface Props {
  createdPost: PostClass;
  createPost(post: INewPost);
  handleCancel();
};

interface State {};

class NewPost extends React.Component<Props, State> {
  onFormSubmit = (post: INewPost) => {
    this.props.createPost(post)
  };
  render() {
    return (
      <Card className={css.newPost}>
        <h1 className={css.title}>
          Новая вакансия
        </h1>
        <NewPostForm onSubmit={this.onFormSubmit} { ...this.props } />
      </Card>
    );
  }
};

const mapStateToProps = state => selectors(state);

const mapDispatchToProps = dispatch => ({
  createPost: (post: INewPost) => dispatch(createPost(post)),
  handleCancel: () => dispatch(handleCancel()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewPost);