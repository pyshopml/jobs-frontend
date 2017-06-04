import * as React from 'react';
import { FormInput, FormField, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'elemental';
import { EditorState, SelectionState } from 'draft-js';
import getSelectedText from 'tools/getSelectedText';
import { validateLinkText, validateLinkUrl } from './validation';

import Icon from 'components/Icon';
import TooltipWrapper from 'components/TooltipWrapper';


interface Props{
  editorState: EditorState;
  onToggle(selection: SelectionState, linkText: string, entityKey);
  style?: any;
};

interface State{
  showURLInput: boolean;
  linkText: string;
  linkUrl: string;
};


class ToggleLinkButton extends React.Component<Props, State>{
  constructor(props) {
    super(props);
    this.state = {
      showURLInput: false,
      linkText: '',
      linkUrl: '',
    };
  }
  updateFields = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  openLinkInput = (e) => {
    e.preventDefault();
    const selectedText = getSelectedText(this.props.editorState);
    this.setState({
      showURLInput: true,
      linkText: selectedText
    });
  };
  closeLinkInput = () => {
    this.setState({showURLInput: false})
  };
  setLink = () => {
    const contentState: any = this.props.editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      'LINK',
      'IMMUTABLE',
      {href: this.state.linkUrl}
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
    const { linkText, linkUrl } = this.state;

    return validateLinkText(linkText) && validateLinkUrl(linkUrl)
  };
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
                onClick={this.setLink}
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
        <Icon icon="link" onMouseDown={this.openLinkInput}/>
        {this.renderModal()}
      </TooltipWrapper>
    );
  }
}
export default ToggleLinkButton;
