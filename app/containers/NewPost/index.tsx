import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import { connect } from 'react-redux';

import IPost from '../../interfaces/ipost';
import NewPostForm from '../../components/NewPostForm';
import { createPost, handleCancel } from './actions';
import selectors from './selectors';

import css from './style.scss';

interface Props{
  createdPost: IPost,
  createPost(post: IPost),
  handleCancel(),
};

interface State{};

class NewPost extends Component<Props, State> {
  render() {
    return (
      <Paper className={css.newPost}>
        <NewPostForm { ...this.props } />
      </Paper>
    );
  }
}

const mapStateToProps = (state) => selectors(state);

const mapDispatchToProps = (dispatch) => ({
  createPost: (post: IPost) => dispatch(createPost(post)),
  handleCancel: () => dispatch(handleCancel()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewPost);