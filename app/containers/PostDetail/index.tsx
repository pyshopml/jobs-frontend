import * as React from 'react';
import { ContentState, EditorState } from 'draft-js';
import Paper from 'material-ui/Paper';
import { connect } from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';

import createEditorState from '../../tools/createEditorState';
import TextEditor from '../../components/TextEditor';
import { loadPost } from './actions';
import PostClass from '../../models/Post.class'

import selectors from './selectors';

import css from './style.scss';

interface Props {
  openedPost: PostClass;
  loadPost(id: number);
  params: {
    id: string
  }
}

interface State {};

class PostDetail extends React.Component<Props, State> {
  componentDidMount(){
    this.props.loadPost(+this.props.params.id);
  }
  componentWillReceiveProps(nextProps){
    if(this.props.params.id != nextProps.params.id)
      this.props.loadPost(+nextProps.params.id);
  }
  renderLoading(){
    return(
      <CircularProgress/>
    )
  }
  getEditorState = () => {
    if(!this.editorState){
      this.editorState = createEditorState(
        ContentState.createFromText(this.props.openedPost.description)
      )
    }
    return this.editorState
  }
  editorState: EditorState = null;
  render() {
    if(!this.props.openedPost)
      return this.renderLoading();
    return (
      <div>
        <Paper className={css.header}>
          <span className={css.date}>{this.props.openedPost.created_on}</span>
          <h1 className={css.title}>{this.props.openedPost.title}</h1>
          <span className={css.employer}>Employer</span>
        </Paper>
        <Paper className={css.post}>
          <TextEditor editorState={this.getEditorState()}
                      onChange={null}
                      readOnly
          />
        </Paper>
      </div>
    );
  }
};

const mapStateToProps = state => selectors(state);

const mapDispatchToProps = dispatch => ({
  loadPost: (id: number) => dispatch(loadPost(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);