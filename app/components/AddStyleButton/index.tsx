import * as React from 'react';
import * as FontAwesome from 'react-fontawesome';
import ToggleIcon from '../ToggleIcon';

import TooltipWrapper from '../TooltipWrapper';

import * as css from './style.scss';;

interface Props{
  icon: string,
  styleType: string;
  active: boolean;
  size?: number;
  style?: any;
  label: string;
  onToggle(style: string)
};

class AddStyleButton extends React.Component<Props, null>{
  onMouseDown = e =>{
    e.preventDefault();
    this.props.onToggle(this.props.styleType);
  };
  render(){
    return(
      <TooltipWrapper label={this.props.label}
                      style={this.props.style}
      >
        <ToggleIcon size={this.props.size}
                    toggled={this.props.active}
                    onMouseDown={this.onMouseDown}
        >
          <FontAwesome name={this.props.icon}
                       className={css.icon}
          />
        </ToggleIcon>
      </TooltipWrapper>
    )
  }
}

export default AddStyleButton;