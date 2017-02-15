import React, { Component } from 'react'
import Logo from '../Logo';
import Navigation from '../Navigation';

import css from './style.scss';

class Header extends Component {
  render() {
    return (
      <section className={css.header}>
        <section className={css.container}>
          <Logo />
          <Navigation />
        </section>
      </section>
    );
  }
}

export default Header;