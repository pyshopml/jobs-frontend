import * as React from 'react';
import * as FontAwesome from 'react-fontawesome';
import * as classNames from 'classnames';

import * as css from './style.scss';;

interface Props{
  icon: string;
  onMouseDown?: (e) => void;
  disabled?: boolean;
  active?: boolean;
};

class Icon extends React.Component<Props, null>{
  static defaultProps = {
    disabled: false
  };
  rootClassNames = () => classNames(
    css.icon,
    {
      [css.disabled]: this.props.disabled,
      [css.active]: this.props.active
    }
  )
  render(){
    return(
      <FontAwesome name={this.props.icon}
                   onMouseDown={this.props.onMouseDown}
                   className={this.rootClassNames()}
      />
    )
  }
}

export default Icon;