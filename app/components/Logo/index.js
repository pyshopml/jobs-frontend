import React, { Component } from 'react'
 
import css from './styles.scss';

class Logo extends Component {
  render() {
    return (
      <h1 className={css.logo}>PyJobs</h1>
    );
  }
}

export default Logo;