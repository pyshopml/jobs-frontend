import React, { Component } from 'react';
import classNames from 'classnames';
import { Editor, EditorState, RichUtils, CompositeDecorator, ContentBlock } from 'draft-js';

import InlineStylesBar from '../InlineStylesBar';
import BlockStylesBar from '../BlockStylesBar';
import DropdownStyles from '../DropdownStyles';
import ToggleLinkButton from '../ToggleLinkButton';
import DescriptionLink from '../DescriptionLink'

import css from './style.scss';

interface Props{
  readOnly?: boolean;
  editorState: any;
  onChange?: any;
};

interface State{
  editorFocused: boolean;
};

// Custom styleMap
const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};

function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote': 
      return 'RichEditor-blockquote';

    default:
      return null;
  }
}

class DescriptionEditor extends Component<Props, State>{
  constructor(props){
    super(props)

    this.state = { editorFocused: false }
  }
  public static defaultProps = {
    readOnly: false
  }

  refs: {
    editor:any
  }

  onToggleStyle = (style: string, type: string)  => {
    this.props.onChange(
      RichUtils[type](
        this.props.editorState,
        style
      ),
      this.focus
    );
  };

  onToggleLink = (editorState, selection, entityKey) => {
    this.props.onChange(RichUtils.toggleLink(
      editorState,
      selection,
      entityKey
    ))
  }

  onTab = e => {
    const maxDepth = 4;
    this.props.onChange(RichUtils.onTab(e, this.props.editorState, maxDepth));
  };

  focus = () => {
    this.refs.editor.focus();
  }

  editorTools() {
    return (
      <section className={ css.editorTools }>
        <section className={ css.stylesButtons }>

          <InlineStylesBar editorState={this.props.editorState}
                           onToggle={ style => this.onToggleStyle(style, 'toggleInlineStyle') }
                           style={ {marginRight: '20px'} } />

          <BlockStylesBar editorState={this.props.editorState}
                          onToggle={ style => this.onToggleStyle(style, 'toggleBlockType') }
                          style={{marginRight: '20px'}}/>

          <ToggleLinkButton editorState={this.props.editorState}
                            onToggleLink={this.onToggleLink}
                            editorFocus={this.focus}/>
        </section>

        <DropdownStyles 
          editorState={this.props.editorState} 
          onToggle={ style => this.onToggleStyle(style, 'toggleBlockType') }
         />

      </section>
    );
  }

  isPlaceholderHidden() {
    let hideDescriptionPlaceholder = false;
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
      [css.focused]: this.state.editorFocused,
      [css.hideDescriptionPlaceholder]: this.isPlaceholderHidden(),
      [css.readOnly]: this.props.readOnly
    });
  }

  render() {
    return(
      <section className={ this.rootClassName() }>

        { this.editorTools() }

        <section className={css.textField}>
          <Editor editorState={this.props.editorState}
                  onChange={this.props.onChange}
                  customStyleMap={styleMap}
                  blockStyleFn={getBlockStyle}
                  ref="editor"
                  spellCheck={true}
                  onTab={this.onTab}
                  onFocus={ ()=>{ this.setState({editorFocused: true}) } }
                  onBlur={ ()=>{ this.setState({editorFocused: false}) } }
                  placeholder="Описание.."
                  readOnly={ this.props.readOnly }
          />
        </section>

        <div className={css.footer}>
          <hr className={css.line}/>
          <hr className={css.lineBlue}/>
        </div>

      </section>
    );
  }
}

function findLinkEntities(block: ContentBlock,
                          callback:(start: number, end: number) => void,
                          contentState?: any): void {
  block.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === 'LINK'
      );
    },
    callback
  );
}

export default DescriptionEditor;
