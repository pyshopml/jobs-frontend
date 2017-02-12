import React, { Component } from 'react'
import Header from '../Header';

import css from './style.css';

class Navigation extends Component {
  render() {
    return (
      <section className={css.navigation}>
        <Header />
      </section>
    );
  }
}

export default Navigation;