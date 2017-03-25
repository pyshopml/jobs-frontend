import * as React from 'react';
import { EditorState, RichUtils, Modifier } from 'draft-js';
import * as classNames from 'classnames';

import TextEditor from '../TextEditor';
import DescriptionEditorTools from '../DescriptionEditorTools';

import * as css from './style.scss';

interface Props{
  editorState: EditorState;
  onChange?: any;
};

interface State{
  editorFocused: boolean
};

class DescriptionEditor extends React.Component<Props, State>{
  constructor(props){
    super(props);
    this.state = {
      editorFocused: false
    }
  }
  refs: {
    editor: any
  }
  onToggleStyle = (style: string, type: string)  => {
    setTimeout(this.refs.editor.focus, 0);
    this.props.onChange(
      RichUtils[type](
        this.props.editorState,
        style
      )
    );
  };

  onToggleLink = (editorState, selection, entityKey) => {
    setTimeout(this.refs.editor.focus, 0);
    this.props.onChange(RichUtils.toggleLink(
      editorState,
      selection,
      entityKey
    ))
  }

  insertLink = (selection, linkText, entityKey) => {
    const newEditorContent = Modifier.replaceText(
      this.props.editorState.getCurrentContent(),
      selection,
      linkText,
      null,
      entityKey
    );
    const newEditorState = EditorState.push(
      this.props.editorState,
      newEditorContent,
      'adjust-depth'
    );

    this.props.onChange(newEditorState);
  }
  rootClassName = () => {
    return classNames({
      [css.descriptionEditor]: true,
      [css.focused]: this.state.editorFocused,
    });
  }
  render() {
    return(
      <section className={this.rootClassName()}>
        <DescriptionEditorTools onToggleLink={this.insertLink}
                                onToggleStyle={this.onToggleStyle}
                                editorState={this.props.editorState}/>
        <section className={css.editor}>
          <TextEditor editorState={this.props.editorState}
                      ref="editor"
                      onChange={this.props.onChange}
                      onFocus={() => this.setState({editorFocused: true})}
                      onBlur={() => this.setState({editorFocused: false})}/>
        </section>
      </section>
    );
  }
}

export default DescriptionEditor;
