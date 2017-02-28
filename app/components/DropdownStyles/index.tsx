import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';


interface Props{
  editorState: any;
  onToggle(style: string)
};
interface State{};

const BLOCK_TYPES_DROPDOWN: any = [
  {label: 'Обычный', style: 'normal'},
  {label: 'Большой Заголовок', style: 'header-two'},
  {label: 'Малый Заголовок', style: 'header-three'},
];

class DropdownStyles extends React.Component<Props, State>{
  onChange = (e, i, value) =>{
    if(value == this.blockType) return;
    if(value == 'normal'){
      this.props.onToggle(this.blockType);
      return
    }
    this.props.onToggle(value)
  };
  blockType;
  render(){
    const selection = this.props.editorState.getSelection();
    this.blockType = this.props.editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType();
    let dropDownValue = BLOCK_TYPES_DROPDOWN[0].style

    BLOCK_TYPES_DROPDOWN.forEach(type=>{
      if(type.style == this.blockType) dropDownValue = type.style
    })
    return(
      <div onMouseDown={e=>e.preventDefault()}>
        <DropDownMenu value={dropDownValue}  onChange={this.onChange} >
          {
            BLOCK_TYPES_DROPDOWN.map((type, index)=>
              <MenuItem key={index} value={type.style} primaryText={type.label} />)
          }

        </DropDownMenu>
      </div>

    )
  }
}
export default DropdownStyles;