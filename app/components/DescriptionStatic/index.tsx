import React, { Component } from 'react';
import { Editor, EditorState, RichUtils, CompositeDecorator, ContentBlock, ContentState } from 'draft-js';
import DescriptionLink from '../DescriptionLink';

import DescriptionEditor from '../DescriptionEditor';

//import css from './style.scss';

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

const decorator = new CompositeDecorator([
  {
    strategy: findLinkEntities,
    component: DescriptionLink,
  },
]);

interface Props{
  text: string;
};
interface State{
  editorState: EditorState
};

class DescriptionStatic extends Component<Props, State>{
  constructor(props){
    super(props)

    this.state = { editorState: EditorState.createWithContent(
      ContentState.createFromText(this.props.text),
      decorator
    )}
  }

  render() {
    return(
      <DescriptionEditor editorState={this.state.editorState} readOnly/>
    );
  }
}

export default DescriptionStatic;
