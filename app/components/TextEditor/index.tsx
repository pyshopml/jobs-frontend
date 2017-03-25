import * as React from 'react';
import * as classNames from 'classnames';
import { Editor, RichUtils, EditorState } from 'draft-js';

import * as css from './style.scss';;

interface Props{
  readOnly?: boolean;
  editorState: EditorState;
  onChange(state: EditorState): any;
  onFocus?(): any;
  onBlur?(): any;
};

interface State{};

function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote': 
      return 'RichEditor-blockquote';

    default:
      return null;
  }
}

class TextEditor extends React.Component<Props, State>{
  refs: {
    editor: any;
  }
  static defaultProps = {
    readOnly: false
  }
  focus = () => {
    this.refs.editor.focus();
  }
  onTab = e => {
    const maxDepth = 4;
    this.props.onChange(RichUtils.onTab(e, this.props.editorState, maxDepth));
  };

  isPlaceholderHidden() {
    const contentState = this.props.editorState.getCurrentContent();

    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        return true;
      }
    }

    return false;
  }

  rootClassName() {
    return classNames({
      [css.editor]: true,
      [css.hideDescriptionPlaceholder]: this.isPlaceholderHidden(),
      [css.readOnly]: this.props.readOnly
    });
  }

  render() {

    return(
      <section className={this.rootClassName()}>
        <Editor editorState={this.props.editorState}
                onChange={this.props.onChange}
                blockStyleFn={getBlockStyle}
                ref="editor"
                spellCheck={true}
                onTab={this.onTab}
                onFocus={ this.props.onFocus }
                onBlur={ this.props.onBlur }
                readOnly={ this.props.readOnly }
        />
      </section>
    );
  }
}

export default TextEditor;
