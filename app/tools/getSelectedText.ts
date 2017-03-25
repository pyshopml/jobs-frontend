import { ContentState, SelectionState } from 'draft-js';

export default function getTelectedText(contentState: ContentState,
                                        selection: SelectionState): string {
    const blockDelimiter = '\n';
    const startKey   = selection.getStartKey();
    const endKey     = selection.getEndKey();
    const blocks     = contentState.getBlockMap();

    let lastWasEnd = false;
    const selectedBlock = blocks
        .skipUntil(function(block) {
            return block.getKey() === startKey;
        })
        .takeUntil(function(block) {
            const result = lastWasEnd;

            if (block.getKey() === endKey) {
                lastWasEnd = true;
            }

            return result;
        });

    return selectedBlock
        .map(function(block) {
            const key = block.getKey();
            let text = block.getText();

            let start = 0;
            let end = text.length;

            if (key === startKey) {
                start = selection.getStartOffset();
            }
            if (key === endKey) {
                end = selection.getEndOffset();
            }

            text = text.slice(start, end);
            return text;
        })
        .join(blockDelimiter);
}