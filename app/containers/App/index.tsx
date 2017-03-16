import React, { Component } from 'react'

import Header from '../../components/Header';
import Alert from '../Alert';
import { connect } from 'react-redux';
import selectors from './selectors';


import css from './style.css';

class App extends Component<null, null> {
  render() {
    return (
      <section className={css.app}>
        <Header />
        <section className={css.container}>
          { this.props.children }
        </section>

        <Alert/>
      </section>
    );
  }
}

const mapStateToProps = state => selectors(state);

export default connect(mapStateToProps)(App);