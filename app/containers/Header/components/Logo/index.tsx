import React, { Component } from 'react'

import css from './style.scss';

interface Props{};
interface State{};

class Logo extends Component<Props, State> {
  render() {
    return (
      <h1 className={css.logo}>PyJobs</h1>
    );
  }
}

export default Logo;