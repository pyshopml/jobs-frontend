import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import { connect } from 'react-redux';

import { createPost } from './actions';
import IPost from '../../interfaces/ipost';
import NewPostForm from '../../components/NewPostForm';
import { getCreatedPost } from './selectors';

import css from './style.scss';

interface Props{
  createdPost: IPost,
  createPost(post: IPost)
};
interface State{};

class NewPost extends Component<Props, State> {
  render() {
    return (
      <Paper className={css.newPost}>
        <NewPostForm />
      </Paper>
    );
  }
}

const mapStateToProps = (state) => ({
  createdPost: getCreatedPost(state)
});

const mapDispatchToProps = (dispatch) => ({
  createPost: (post: IPost) => dispatch( createPost(post) )
});

export default connect(mapStateToProps, mapDispatchToProps)(NewPost);