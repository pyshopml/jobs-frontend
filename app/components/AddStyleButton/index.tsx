import React from 'react';
import FontAwesome from 'react-fontawesome';
import ToggleIcon from '../ToggleIcon';
import Tooltip from 'material-ui/internal/Tooltip';


import css from './style.scss';

interface Props{
  icon: string,
  styleType: string;
  active: boolean;
  size?: number;
  style?: any;
  label: string;
  onToggle(style: string)
};
interface State{
  showTooltip: boolean
};


class AddStyleButton extends React.Component<Props, State>{
  constructor(props){
    super(props)
    this.state = {
      showTooltip: false
    }
  }
  onMouseDown = e =>{
    e.preventDefault();
    this.props.onToggle(this.props.styleType);
  }
  showTooltip = () => {
    this.setState({showTooltip: true})
  }
  hideTooltip = () => {
    this.setState({showTooltip: false})
  }
  render(){
    return(
      <div className={css.addStyleButton}
           onMouseDown={this.onMouseDown}
           onMouseEnter={this.showTooltip}
           onMouseLeave={this.hideTooltip}
           style={this.props.style}>
        <ToggleIcon size={this.props.size} toggled={this.props.active}>
          <Tooltip label={this.props.label}
                   show={this.state.showTooltip}
                   horizontalPosition="right"/>
          <FontAwesome name={this.props.icon}
                       className={css.icon}/>
        </ToggleIcon>
      </div>
    )
  }
}

export default AddStyleButton;