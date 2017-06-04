import * as React from 'react';
import * as classNames from 'classnames';
import * as Select from 'react-select';

import * as css from './style.scss';


interface State{
  value: string
}

class DropdownField extends React.Component<any, State>{
  constructor(props){
    super(props);
    this.state = {
      value: props.value || ''
    }
  }
  onChange = (e) => {
    if(this.props.onChange){
      this.props.onChange(e)
    }
    this.setState({value: e.target.value})
  }
  rootClass = () => {
    return classNames(css.root, this.props.className)
  }
  render(){
    return(
      <Select {...this.props}
        clearable={false}
        searchable={false}
        className={this.rootClass()}/>
    )
  }
}

export default DropdownField;