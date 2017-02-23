import React, { Component } from 'react';
import { TextField, RaisedButton } from 'material-ui';
import { EditorState } from 'draft-js';
import DescriptionEditor from '../DescriptionEditor';
import IPost from '../../interfaces/ipost';

import css from './style.scss';

interface Props {
  createPost(post: IPost),
  handleCancel(),
};

interface State { 
  title: string,
  editorState: any,
};

class NewPostForm extends Component<Props, State> {
  constructor(props) {
    super(props)

    this.state = {
      title: '',
      editorState: EditorState.createEmpty(),
    }

    this.hanldeSubmit = this.hanldeSubmit.bind(this);
    this.updateTitle = this.updateTitle.bind(this);
  }

  hanldeSubmit(evt) {
    evt.preventDefault();
  }

  updateTitle(evt) {
    const { name, value } = evt.target;
    this.setState({ [name]: value });
  }

  render() {
    const { title } = this.state;
    const { handleCancel } = this.props;

    return(
      <form action="">
        <RaisedButton secondary={true} label="Назад" className={ css.backButton } onClick={ handleCancel } />

        <TextField hintText="Заголовок.."
                   name="title"
                   value={ title }
                   fullWidth={ true }
                   onChange={this.updateTitle}
                   inputStyle={{padding: '0 10px'}}
                   hintStyle={{left: '10px', transition: 'none'}} />

        <DescriptionEditor />
        
        <div className={ css.controls }>
          <RaisedButton href="#" label="Очистить" />
          <RaisedButton type="submit" label="Создать" primary={true} onClick={ this.hanldeSubmit } />
        </div>
      </form>
    )
  }
}

export default NewPostForm;
