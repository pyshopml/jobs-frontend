import * as React from 'react';
import { TextField, RaisedButton } from 'material-ui';
import { ContentState, EditorState} from 'draft-js';
import DescriptionEditor from '../DescriptionEditor';
import INewPost from '../../interfaces/inewpost';

import createEditorState from '../../tools/createEditorState';

import * as css from './style.scss';;

interface Props {
  createPost(post: INewPost),
  onSubmit(post: INewPost)
};

interface State { 
  title: string,
  editorState: any,
};

class NewPostForm extends React.Component<Props, State> {
  constructor(props) {
    super(props)

    this.state = {
      title: '',
      editorState: createEditorState()
    }

    this.hanldeSubmit = this.hanldeSubmit.bind(this);
    this.updateTitle = this.updateTitle.bind(this);
  }
  onChange = (editorState, callback?) => {
    this.setState({
      editorState
    }, callback)
  }

  hanldeSubmit(evt) {
    evt.preventDefault();
    const { editorState } = this.state;
    this.props.onSubmit({
      title: this.state.title,
      //description: convertToRaw(editorState.getCurrentContent()),
      description: editorState.getCurrentContent().getPlainText(),
      keywords: []
    })
  }

  updateTitle(evt) {
    const { name, value } = evt.target;
    this.setState({ [name]: value });
  }
  clearFields = () => {
    const editorState = EditorState.push(
      this.state.editorState,
      ContentState.createFromText(''),
      "adjust-depth"
    );
    this.setState({ title: '', editorState });
  }
  isButtonSubmitDisabled = () => {
    const isDescriptionEmpty = !this.state.editorState.getCurrentContent().hasText();
    if( this.state.title.trim() == '' || isDescriptionEmpty) return true;
    return false;
  }
  render() {
    const { title } = this.state;

    return(
      <form action="">
        <TextField hintText="Заголовок.."
                   name="title"
                   value={ title }
                   fullWidth={ true }
                   onChange={this.updateTitle}
                   inputStyle={{padding: '0 10px'}}
                   hintStyle={{left: '10px', transition: 'none'}} />

        <DescriptionEditor onChange={ this.onChange } editorState={ this.state.editorState }  />
        
        <div className={ css.controls }>
          <RaisedButton label="Очистить" onClick={this.clearFields}/>
          <RaisedButton type="submit"
                        label="Создать"
                        primary={true}
                        disabled={ this.isButtonSubmitDisabled() }
                        onClick={ this.hanldeSubmit } />
        </div>
      </form>
    )
  }
}

export default NewPostForm;
