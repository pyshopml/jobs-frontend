import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import { connect } from 'react-redux';


import PostClass from '../../models/Post.class';
import INewPost from '../../interfaces/inewpost';
import NewPostForm from '../../components/NewPostForm';
import { createPost, handleCancel } from './actions';
import selectors from './selectors';

import css from './style.scss';

interface Props {
  createdPost: PostClass;
  createPost(post: INewPost);
  handleCancel();
};

interface State {};

class NewPost extends Component<Props, State> {
  onFormSubmit = (post: INewPost) => {
    this.props.createPost(post)
  };
  render() {
    return (
      <Paper className={css.newPost}>
        <NewPostForm onSubmit={this.onFormSubmit} { ...this.props } />
      </Paper>
    );
  }
};

const mapStateToProps = state => selectors(state);

const mapDispatchToProps = dispatch => ({
  createPost: (post: INewPost) => dispatch(createPost(post)),
  handleCancel: () => dispatch(handleCancel()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewPost);