import * as React from 'react';
import { EditorState } from 'draft-js';

import InlineStylesBar from '../InlineStylesBar';
import BlockStylesBar from '../BlockStylesBar';
import DropdownStyles from '../DropdownStyles';
import ToggleLinkButton from '../ToggleLinkButton';

import * as css from './style.scss';;

interface Props{
  editorState: EditorState,
  onToggleStyle(style: any, type): any;
  onToggleLink(editorState: EditorState, selection: any, entityKey: any);
};

interface State{};

class DescriptionEditorTools extends React.Component<Props, State>{
  render() {
    return(
      <section className={ css.editorTools }>
        <section className={ css.stylesButtons }>

          <InlineStylesBar editorState={this.props.editorState}
                           onToggle={ style => this.props.onToggleStyle(style, 'toggleInlineStyle') }
                           style={ {marginRight: '20px'} } />

          <BlockStylesBar editorState={this.props.editorState}
                          onToggle={ style => this.props.onToggleStyle(style, 'toggleBlockType') }
                          style={{marginRight: '20px'}}/>

          <ToggleLinkButton editorState={this.props.editorState}
                            onToggle={this.props.onToggleLink}/>
        </section>

        <DropdownStyles
          editorState={this.props.editorState}
          onToggle={ style => this.props.onToggleStyle(style, 'toggleBlockType') }
        />

      </section>
    );
  }
}
export default DescriptionEditorTools;
