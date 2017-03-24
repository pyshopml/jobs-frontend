import * as React from 'react';
import Tooltip from 'material-ui/internal/Tooltip';
import * as classNames from 'classnames';

import * as css from './style.scss';

interface State{
  showTooltip: boolean;
}

interface Props{
  label: string;
  className?: string;
  style?: any;
  horizontalPosition?: 'left' | 'right';
  verticalPosition?: 'top' | 'bottom';
}


class TooltipWrapper extends React.Component<Props, State>{
  constructor(props){
    super(props);
    this.state = {
      showTooltip: false
    }
  }
  static defaultProps = {
    horizontalPosition: 'right',
    verticalPosition: null
  };
  showTooltip = () => {
    this.setState({showTooltip: true})
  };
  hideTooltip = () => {
    this.setState({showTooltip: false})
  };
  rootClassName = () => {
    return classNames(
      [this.props.className],
      [css.tooltipWrapper]
    )
  };
  render(){
    return(
      <div onMouseEnter={this.showTooltip}
           onMouseLeave={this.hideTooltip}
           className={this.rootClassName()}
           style={this.props.style}
      >
        <Tooltip label={this.props.label}
                 show={this.state.showTooltip}
                 className={` ${this.props.className}`}
                 verticalPosition={this.props.verticalPosition}
                 horizontalPosition={this.props.horizontalPosition}
        />
        {this.props.children}
      </div>
    )
  }
}

export default TooltipWrapper;