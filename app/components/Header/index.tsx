import React, { Component } from 'react'
import Logo from '../Logo';
import Navigation from '../Navigation';

import css from './style.scss';

interface Props{};
interface State{};

class Header extends Component<Props, State> {
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