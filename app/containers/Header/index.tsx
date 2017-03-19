import * as React from 'react'
import { Button } from 'elemental';
import { Link } from 'react-router';
import Logo from './components/Logo';

import * as css from './style.scss';

interface Props{};
interface State{};

const style = {
  margin: 12,
};

class Header extends React.Component<Props, State> {
	LoginBar() {
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

  render() {
    return (
	    <header className={css.header}>
		    <div className={css.container}>
			    <Logo />
					{ this.LoginBar() }
		    </div>
	    </header>
    )
  }
}

export default Header;