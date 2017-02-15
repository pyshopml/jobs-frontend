import React, { Component } from 'react'
import { Link } from 'react-router';

import css from './style.scss';

interface Props{};
interface State{};


class Navigation extends Component<Props, State> {
  render() {
    return (
      <nav className={css.navigation}>
        <ul>
          <li>
            <Link to='/login'>Войти</Link>
          </li>
          <li>
            <Link to='/singup'>Зарегистрироваться</Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navigation;