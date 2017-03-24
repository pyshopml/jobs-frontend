import * as React from 'react'
import { Button } from 'elemental';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Logo from './components/Logo';
import selectors from './selectors';
import { logoutUser } from '../App/actions';
import { redirectToSignup } from './actions';
import AuthBar from './components/AuthBar';

import * as css from './style.scss';

interface Props {
  isLoggedIn: boolean;
  logoutUser: () => void;
  redirectToSignup: (path: string) => void;
};

interface State {
};

class Header extends React.Component<Props, State> {

  signupClickHandler = (path: string) => {
    this.props.redirectToSignup(path);
  }

	loginBar() {
    return (
      <section className={css.authControls}>
        <Button type="link-primary" size="xs" onClick={ () => this.signupClickHandler('/login') }>
          Вход
        </Button>
        <Button type="success" size="xs" onClick={ () => this.signupClickHandler('/signup') }>
          Регистрация
        </Button>
      </section>
    );
  }


  userAuthBar() {
    return (
      <section className={css.authControls}>
        <AuthBar {...this.props} />
      </section>
    );
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
	    <header className={css.header}>
		    <div className={css.container}>
			    <Logo />
					{ isLoggedIn ? this.userAuthBar() : this.loginBar() }
		    </div>
	    </header>
    )
  }
}

const mapStateToProps = state => selectors(state);

const mapDispatchToProps = dispatch => ({
  logoutUser: () => dispatch(logoutUser()),
  redirectToSignup: (path) => dispatch(redirectToSignup(path)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);