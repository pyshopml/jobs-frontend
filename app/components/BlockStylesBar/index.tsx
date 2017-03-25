import * as React from 'react';

import AddStyleButton from '../AddStyleButton';

import * as css from './style.scss';;

interface Props{
  editorState: any;
  onToggle(style: string);
  style?: {};
};
interface State{};

const BLOCK_TYPES: any = [
  {icon: 'list-ol', label: 'Нумерованный Список', style: 'ordered-list-item'},
  {icon: 'list-ul', label: 'Маркированный Список', style: 'unordered-list-item'},
  {icon: 'quote-right', label: 'Цитата', style: 'blockquote'},
];

class BlockStylesBar extends React.Component<Props, State>{
  render(){
    const selection = this.props.editorState.getSelection();
    const blockType = this.props.editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType();
    return(
      <div style={this.props.style} className={css.blockStylesBar}>
        {
          BLOCK_TYPES.map( (type, index) =>
            <AddStyleButton icon={type.icon}
                            styleType={type.style}
                            active={type.style === blockType}
                            onToggle={this.props.onToggle}
                            size={type.iconSize}
                            label={type.label}
                            key={index}/>
          )
        }
      </div>
    )
  }
}
export default BlockStylesBar;