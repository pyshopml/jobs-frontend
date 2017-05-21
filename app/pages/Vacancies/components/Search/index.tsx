import * as React from 'react';

import TextField from 'components/TextField';

import * as css from './style.scss';

interface Props {
  onChange(val: string): void;
  value: string;
};

class Search extends React.Component<Props, null> {
  render(){
    return(
      <div className={css.container}>
        <TextField value={this.props.value} onChange={this.props.onChange}/>
      </div>
    )
  }
}

export default Search;