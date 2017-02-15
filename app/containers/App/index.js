import React, { Component } from 'react'
import Header from '../../components/Header';
import AddButton from '../../components/AddPostButton';

import base from './base.css';
import css from './style.css';

class App extends Component {
  render() {
    return (
      <section className={css.app}>
        <Header />
        <section className={css.container}>
          { this.props.children }
        </section>

        <AddButton />
      </section>
    );
  }
}

export default App;