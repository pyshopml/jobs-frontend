import * as React from 'react';
import { Button } from 'elemental';
import { ContentState, EditorState} from 'draft-js';
import { FormInput, FormField, Form as ElementalForm } from 'elemental';

import DescriptionEditor from '../DescriptionEditor';
import { INewPost } from 'interfaces';

import createEditorState from 'tools/createEditorState';

import * as css from './style.scss';

interface Props {
  createPost(post: INewPost),
  onSubmit(post: INewPost)
};

interface State { 
  title: string,
  editorState: any,
};

class Form extends React.Component<Props, State> {
  constructor(props) {
    super(props)

    this.state = {
      title: '',
      editorState: createEditorState()
    }
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    const { editorState } = this.state;
    this.props.onSubmit({
      title: this.state.title,
      //description: convertToRaw(editorState.getCurrentContent()),
      description: editorState.getCurrentContent().getPlainText(),
      keywords: []
    })
  }

  updateField = (name, value) => {
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
  isFieldsValid = () => {
    const isDescriptionEmpty = !this.state.editorState.getCurrentContent().hasText();
    if( this.state.title.trim() == '' || isDescriptionEmpty) return false;
    return true;
  }
  render() {
    const { title } = this.state;

    return(
      <ElementalForm>
        <FormField label="Название вакансии">
          <input name="title"
                 className={css.textField}
                 value={ title }
                 onChange={(evt) => this.updateField(evt.target.name, evt.target.value)}/>
        </FormField>
        <FormField label="Описание">
          <DescriptionEditor editorState={ this.state.editorState }
                             onChange={
                               (editorState) => this.updateField("editorState", editorState)
                             }
          />
        </FormField>

        <div className={ css.controls }>
          <Button type="hollow-primary" onClick={this.clearFields}>
            Очистить
          </Button>
          <Button type="primary"
                  onClick={this.handleSubmit}
                  disabled={!this.isFieldsValid()}
                  submit
          >
            Создать
          </Button>
        </div>
      </ElementalForm>
    )
  }
}

export default Form;
