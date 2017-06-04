import { ContentState, EditorState, CompositeDecorator, ContentBlock } from 'draft-js';

import DescriptionLink from './components/DescriptionLink';

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

export default function createEditorState(content?: ContentState){
  if(content)
    return  EditorState.createWithContent(content, decorator);
  return EditorState.createEmpty(decorator)
}