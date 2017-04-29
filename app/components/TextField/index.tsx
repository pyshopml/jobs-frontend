import * as React from 'react';
import * as classNames from 'classnames';

import * as css from './style.scss';


interface State{
  value: string
}

class TextField extends React.Component<any, State>{
  constructor(props){
    super(props);
    this.state = {
      value: props.value || ''
    }
  }
  onChange = (e) => {
    if(this.props.type == 'number'){
      if(!this.isValueNumber(e.target.value)) return;
    }
    if(this.props.onChange) this.props.onChange(e);
    this.setState({value: e.target.value})
  }
  isValueNumber(value){
    return !isNaN(value)
  }
  rootClass = () => {
    return classNames(css.root, this.props.className)
  }
  render(){
    return(
      <input value={this.state.value}
             {...this.props}
             className={this.rootClass()}
             onChange={this.onChange}
             type="text" />
    )
  }
}

export default TextField;