import React from 'react';
import FontAwesome from 'react-fontawesome';
import ToggleIcon from '../ToggleIcon';
import Tooltip from 'material-ui/internal/Tooltip';
import Popover from 'material-ui/Popover';
import TextField from 'material-ui/TextField';
import { EditorState } from 'draft-js';


import css from './style.scss';

interface Props{
  editorState: any;
  editorFocus();
  onToggleLink(editorState: any, selection: any, entityKey: any);
  style?: any;
};
interface State{
  showTooltip: boolean
  showURLInput: boolean
  urlValue: string;
  anchorEl: any;
};


class ToggleLinkButton extends React.Component<Props, State>{
  constructor(props) {
    super(props);
    this.state = {
      showTooltip: false,
      showURLInput: false,
      urlValue: '',
      anchorEl: null
    };
  }
  refs: {
    linkInput: any
  }
  onURLChange = e => this.setState({urlValue: e.target.value.trim()});

  promptForLink = (e) => {
    e.preventDefault();
    const selection = this.props.editorState.getSelection();
    if (!selection.isCollapsed()) {
      const contentState = this.props.editorState.getCurrentContent();
      const startKey = this.props.editorState.getSelection().getStartKey();
      const startOffset = this.props.editorState.getSelection().getStartOffset();
      const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
      const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);

      let url = '';
      if (linkKey) {
        const linkInstance = contentState.getEntity(linkKey);
        url = linkInstance.getData().url;
      }
      this.setState({
        showURLInput: true,
        anchorEl: e.currentTarget,
        urlValue: url,
      }, () => {
        setTimeout(() => this.refs.linkInput.focus(), 0);
      });
    }
  }

  confirmLink = e => {
    e.preventDefault();
    const contentState = this.props.editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      'LINK',
      'IMMUTABLE',
      {url: this.state.urlValue}
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(
      this.props.editorState, { currentContent: contentStateWithEntity }
    );
    this.props.onToggleLink(
      newEditorState,
      newEditorState.getSelection(),
      entityKey
    )
    this.setState({
      showURLInput: false,
      urlValue: '',
    }, () => {
      setTimeout(() => this.props.editorFocus(), 0);
    });
  }

  onLinkInputKeyDown = e => {
    if (e.which === 13 && this.state.urlValue != '') { //Enter
      this.confirmLink(e);
    }
    if (e.which === 27) { // Esc
      this.closeLinkInput()
    }
  }
  closeLinkInput = () => {
    this.setState({showURLInput: false}, () => {
      setTimeout(() => this.props.editorFocus(), 0);
    })
  }
  showTooltip = () => {
    this.setState({showTooltip: true})
  }
  hideTooltip = () => {
    this.setState({showTooltip: false})
  }
  removeLink = e => {
    e.preventDefault();
    const selection = this.props.editorState.getSelection();
    if (!selection.isCollapsed()) {
      this.props.onToggleLink(
        this.props.editorState,
        selection,
        null)
    }
  }

  render() {
    const isTextSelected = !this.props.editorState.getSelection().isCollapsed()
    const isUrlEmpty = this.state.urlValue.trim() == '';
    return (
      <div style={this.props.style}
           className={css.toggleLinkButton}
           onMouseEnter={this.showTooltip}
           onMouseLeave={this.hideTooltip}>
        <Tooltip label={isTextSelected ? "Ссылка" : "Выделите текст чтобы вставить ссылку"}
                 show={this.state.showTooltip}
                 horizontalPosition="right"/>
        <ToggleIcon onMouseDown={this.promptForLink}
                    toggled={ this.state.showURLInput }
                    disabled={ !isTextSelected }>
          <FontAwesome name="link"/>
        </ToggleIcon>
        <Popover
          open={this.state.showURLInput}
          anchorEl={this.state.anchorEl}
          onRequestClose={ this.closeLinkInput }
          anchorOrigin={{horizontal: 'right', vertical: 'center'}}
          targetOrigin={{horizontal: 'left', vertical: 'center'}}
          style={{padding: '0 15px'}}
        >
          <div style={{display: 'flex', alignItems: 'center'}}>
            <TextField onKeyDown={this.onLinkInputKeyDown}
                       name="link"
                       onChange={this.onURLChange}
                       value={this.state.urlValue}
                       ref="linkInput"
                       hintText="https://example.com"/>
            <ToggleIcon onMouseDown={this.confirmLink}
                        style={{marginLeft: '10px'}}
                        toggled={false}
                        disabled={ isUrlEmpty }>
              <FontAwesome name="check"/>
            </ToggleIcon>
            <ToggleIcon onMouseDown={this.closeLinkInput}
                        style={{marginLeft: '10px'}}
                        toggled={false}>
              <FontAwesome  name="close"/>
            </ToggleIcon>
          </div>
        </Popover>
      </div>
    );
  }
}

export default ToggleLinkButton;
