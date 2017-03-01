import React, { Component } from 'react'
import Logo from '../Logo';

import Auth from '../../containers/Auth';

import css from './style.scss';

interface Props{};
interface State{};

class Header extends Component<Props, State> {
  render() {
    return (
	    <section className={css.header}>
		    <section className={css.container}>
			    <Logo />
			    <Auth />
		    </section>
	    </section>
    )
  }
}

export default Header;