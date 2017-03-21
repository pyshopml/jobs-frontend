import * as React from 'react'
import { Button } from 'elemental';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Logo from './components/Logo';
import selectors from './selectors';

import * as css from './style.scss';

interface Props {
  isLoggedIn: boolean;
};
interface State {};

const style = {
  margin: 12,
};

class Header extends React.Component<Props, State> {
	loginBar() {
    return (
      <section className={css.authControls}>
        <Button type="link-primary" size="xs">
          <Link to="/login">Вход</Link>
        </Button>
        <Button type="success" size="xs">
          <Link to="/signup">Регистрация</Link>
        </Button>
      </section>
    );
  }

  userAuthBar() {
    return (
      <section className={css.authControls}>
        <Button type="warning" size="xs">
          Выйти
        </Button>
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

export default connect(mapStateToProps)(Header);