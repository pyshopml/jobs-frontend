import * as React from 'react';
import { EditorState, RichUtils } from 'draft-js';
import * as classNames from 'classnames';

import TextEditor from '../TextEditor';
import DescriptionEditorTools from '../DescriptionEditorTools';

import css from './style.scss';

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
  rootClassName = () => {
    return classNames({
      [css.descriptionEditor]: true,
      [css.focused]: this.state.editorFocused,
    });
  }
  render() {
    return(
      <section className={this.rootClassName()}>
        <DescriptionEditorTools onToggleLink={this.onToggleLink}
                                onToggleStyle={this.onToggleStyle}
                                editorState={this.props.editorState}/>
        <section className={css.editor}>
          <TextEditor editorState={this.props.editorState}
                      ref="editor"
                      onChange={this.props.onChange}
                      onFocus={() => this.setState({editorFocused: true})}
                      onBlur={() => this.setState({editorFocused: false})}/>
        </section>

        <div className={css.footer}>
          <hr className={css.line}/>
          <hr className={css.lineBlue}/>
        </div>

      </section>
    );
  }
}

export default DescriptionEditor;
