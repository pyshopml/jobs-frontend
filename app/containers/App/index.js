import React, { Component } from 'react'
import Navigation from '../../components/Navigation';

import base from './base.css';
import css from './style.css';

class App extends Component {
  render() {
    return (
      <section className={css.app}>
        <Navigation />
        { this.props.children }
      </section>
    );
  }
}

export default App;