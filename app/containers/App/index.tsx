import * as React from 'react'

import Header from '../Header';
import Alert from '../Alert';
import { connect } from 'react-redux';
import selectors from './selectors';

import * as css from './style.css';

const authPaths = [ 'login', 'signup', 'info_page', 'restore_password' ];

interface Props {
  pathname: string;
}

class App extends React.Component<Props, null> {

  isServiceLink() {
    const { pathname } = this.props;
    return pathname.includes('password-reset') || pathname.includes('activate');
  }

  isSpecialPath() {
    const { pathname } = this.props;
    return authPaths.find(p => p === pathname)
  }

  isAuthPath() {
    return this.isSpecialPath() || this.isServiceLink();
  }

  render() {
    return (
      <section className={css.app}>
        { this.isAuthPath() ? '' : <Header /> }
        <section className={css.container}>
          { this.props.children }
        </section>

        <Alert/>
      </section>
    );
  }
}

const mapStateToProps = (state, props) => selectors(state, props);

export default connect(mapStateToProps)(App);