
import React, { Component } from 'react'
import Navigation from '../../components/Navigation';

import css from './style.css';

interface Props{}
interface State{}

class App extends Component<Props, State> {
  render() {
    return (
      <section className={css.app}>
        <Navigation />
        { this.props.children}
      </section>
    );
  }
}

export default App;