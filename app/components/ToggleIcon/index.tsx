import * as React from 'react';
import * as classNames from 'classnames';

import css from './style.scss';

interface Props{
  toggled: boolean;
  disabled?: boolean;
  size?: number;
  onMouseDown?: any;
  style?: {}
};
interface State{};

class ToggleIcon extends  React.Component<Props, State>{
  public static defaultProps = {
    size: 18
  };
  render(){
    const className = classNames({
      [css.toggleIcon]: true,
      [css.active]: this.props.toggled,
      [css.disabled]: this.props.disabled
    })
    return (
      <div style={{fontSize: this.props.size + 'px', ...this.props.style}}
           className={className}
           onMouseDown={!this.props.disabled ? this.props.onMouseDown : null}>
        {this.props.children}
      </div>
    )
  };
}

export default ToggleIcon;