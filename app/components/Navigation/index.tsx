import React, { Component } from 'react'
import Header from '../Header';

import css from './style.css';

interface Props{}
interface State{}

class Navigation extends Component<Props, State> {
  render() {
    return (
      <section className={css.navigation}>
        <Header />
      </section>
    );
  }
}

export default Navigation;