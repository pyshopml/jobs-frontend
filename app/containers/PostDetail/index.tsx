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

import * as css from './style.scss';

interface Props {
  openedPost: PostClass;
  loadPost(id: number);
  params: {
    id: string
  }
}

interface State {};

class PostDetail extends React.Component<Props, State> {
  editorState: EditorState = null;    

  componentDidMount(){
    this.props.loadPost(+this.props.params.id);
  }

  componentWillReceiveProps(nextProps){
    if(this.props.params.id != nextProps.params.id)
      this.props.loadPost(+nextProps.params.id);
  }

  renderLoading(){
    return(
      <CircularProgress />
    )
  }

  getEditorState = () => {
    if(!this.editorState) {
      this.editorState = createEditorState(
        ContentState.createFromText(this.props.openedPost.description)
      )
    }
    return this.editorState
  }

  render() {
    if(!this.props.openedPost)
      return this.renderLoading();

    return (
      <article>
        <section className={css.container}>
          <h1 className={css.mainTitle}>{this.props.openedPost.title}</h1>
        </section>

        <section className={css.container}>
          <h2 className={css.title}>Описание вакансии</h2>
          <TextEditor editorState={this.getEditorState()}
                      onChange={null}
                      readOnly
          />
        </section>
      </article>
    );
  }
};

const mapStateToProps = state => selectors(state);

const mapDispatchToProps = dispatch => ({
  loadPost: (id: number) => dispatch(loadPost(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);