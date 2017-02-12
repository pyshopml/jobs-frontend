import React, { Component } from 'react'

import base from './base.css';
import css from './style.css';

class App extends Component {
  render() {
    return (
      <section className={css.app}>
        { this.props.children }
      </section>
    );
  }
}

export default App;