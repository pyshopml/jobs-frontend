import * as React from 'react';
import { FormInput, FormField, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'elemental';
import { EditorState } from 'draft-js';
import getSelectedText from '../../tools/getSelectedText'

import Icon from '../Icon';
import TooltipWrapper from '../TooltipWrapper';


interface Props{
  editorState: any;
  onToggle(selection: any, linkText: string, entityKey: any);
  style?: any;
};
interface State{
  showURLInput: boolean;
  linkText: string;
  linkUrl: string;
  anchorEl: any;
};


class ToggleLinkButton extends React.Component<Props, State>{
  constructor(props) {
    super(props);
    this.state = {
      showURLInput: false,
      linkText: '',
      linkUrl: '',
      anchorEl: null
    };
  }
  updateFields = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  promptForLink = (e) => {
    e.preventDefault();
    const contentState = this.props.editorState.getCurrentContent();
    const selection = this.props.editorState.getSelection();
    const selectedText = getSelectedText(contentState, selection);
    this.setState({
      showURLInput: true,
      anchorEl: e.currentTarget,
      linkText: selectedText
    });
  }
  closeLinkInput = () => {
    this.setState({showURLInput: false})
  }
  confirmLink = e => {
    e.preventDefault();
    const contentState = this.props.editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      'LINK',
      'IMMUTABLE',
      {url: this.state.linkUrl}
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(
      this.props.editorState, { currentContent: contentStateWithEntity }
    );
    this.props.onToggle(
      newEditorState.getSelection(),
      this.state.linkText,
      entityKey
    )
    this.setState({
      showURLInput: false,
      linkUrl: '',
      linkText: ''
    });
  }
  isLinkValid = () => {
    if(!this.state.linkText || !this.state.linkUrl)
      return false;
    const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return pattern.test(this.state.linkUrl);
  }
  renderModal = () => (
    <Modal isOpen={this.state.showURLInput} onCancel={this.closeLinkInput} backdropClosesModal={true}>
      <ModalHeader text="Вставить ссылку" showCloseButton onClose={this.closeLinkInput} />
      <ModalBody>
        <FormField label="Текст" htmlFor="linkText">
          <FormInput name="linkText"
                     autoFocus
                     value={this.state.linkText}
                     onChange={this.updateFields}/>
        </FormField>
        <FormField label="URL" htmlFor="linkUrl">
          <FormInput name="linkUrl"
                     value={this.state.linkUrl}
                     placeholder="example.com"
                     onChange={this.updateFields}/>
        </FormField>
      </ModalBody>
      <ModalFooter>
        <Button type="primary"
                disabled={!this.isLinkValid()}
                onClick={this.confirmLink}
        >
          Вставить
        </Button>
      </ModalFooter>
    </Modal>
  )
  render() {
    return (
      <TooltipWrapper label="Ссылка"
                      style={this.props.style}>
        <Icon icon="link" onMouseDown={this.promptForLink}/>
        {this.renderModal()}
      </TooltipWrapper>
    );
  }
}
export default ToggleLinkButton;
