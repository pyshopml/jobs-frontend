import React, { Component } from 'react'
import Header from '../../components/Header';
import AddButton from '../../components/AddPostButton';

import css from './style.css';

interface Props{};
interface State{};

class App extends Component<Props, State> {
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