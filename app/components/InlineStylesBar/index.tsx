import React from 'react';

import AddStyleButton from '../AddStyleButton';

import css from './style.scss';

interface Props{
  editorState: any;
  onToggle(style: string);
  onToggleLink?: any;
  focus?: any;
  style?: {};
};
interface State{};

const INLINE_STYLES: any[] = [
  {label: 'Жирный',icon: 'bold', style: 'BOLD'},
  {label: 'Курсив',icon: 'italic', style: 'ITALIC'},
  //{label: 'Подчеркивание',icon: 'underline', style: 'UNDERLINE'},
  //{label: 'Код',icon: 'code', style: 'CODE', iconSize: 19},
]

class InlineStylesBar extends React.Component<Props, State>{
  render(){
    const currentStyle = this.props.editorState.getCurrentInlineStyle();
    return(
      <div style={this.props.style} className={css.inlineStylesBar}>
        {
          INLINE_STYLES.map( (type, index) =>
            <AddStyleButton icon={type.icon}
                            styleType={type.style}
                            active={currentStyle.has(type.style)}
                            onToggle={this.props.onToggle}
                            size={type.iconSize}
                            label={type.label}
                            key={index}
                            style={{marginRight: '10px'}}/>
          )
        }
      </div>
    )
  }
}

export default InlineStylesBar;