import React from 'react';
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
};

interface State{
  editorState: any;
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

class DescriptionEditor extends React.Component<Props, State>{
  constructor(props){
    super(props)

    const decorator = new CompositeDecorator([
      {
        strategy: findLinkEntities,
        component: DescriptionLink,
      },
    ]);

    this.state = {
      editorState: EditorState.createEmpty(decorator),
      editorFocused: false
    }
  }

  public static defaultProps: Props = {
    readOnly: false
  };

  refs: {
    editor:any
  }

  onChange = (editorState, callback?) => {
    this.setState({
      editorState
    }, callback)
  }

  onToggleInlineStyle = (style:string) => {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        style
      ),
      this.focus
    );
  };

  onToggleBlockStyle = (style: string)  => {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        style
      ),
      this.focus
    );
  };

  onToggleLink = (editorState, selection, entityKey) => {
    this.onChange(RichUtils.toggleLink(
      editorState,
      selection,
      entityKey
    ))
  }

  onTab = e => {
    const maxDepth = 4;
    this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
  };

  focus = () => {
    this.refs.editor.focus();
  }

  editorTools() {
    return (
      <section className={css.editorTools}>
        <div className={css.stylesButtons}>

          <InlineStylesBar editorState={this.state.editorState}
                           onToggle={this.onToggleInlineStyle}
                           style={{marginRight: '20px'}}/>

          <BlockStylesBar editorState={this.state.editorState}
                          onToggle={this.onToggleBlockStyle}
                          style={{marginRight: '20px'}}/>

          <ToggleLinkButton editorState={this.state.editorState}
                            onToggleLink={this.onToggleLink}
                            editorFocus={this.focus}/>
        </div>
        <DropdownStyles editorState={this.state.editorState} onToggle={this.onToggleBlockStyle}/>
      </section>
    );
  }

  isPlaceholderHidden() {
    let hideDescriptionPlaceholder = false;
    const contentState = this.state.editorState.getCurrentContent();

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
          <Editor editorState={this.state.editorState}
                  onChange={this.onChange}
                  customStyleMap={styleMap}
                  blockStyleFn={getBlockStyle}
                  ref="editor"
                  spellCheck={true}
                  onTab={this.onTab}
                  onFocus={()=>{this.setState({editorFocused: true})}}
                  onBlur={()=>{this.setState({editorFocused: false})}}
                  placeholder="Описание.."
                  readOnly={this.props.readOnly}
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
