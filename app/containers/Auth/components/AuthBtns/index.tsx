import * as React from 'react'
import RaisedButton from 'material-ui/RaisedButton';

import css from './style.scss';

interface Props {
  isAuth: boolean;
  isSignUp: boolean;
  openModal(val: string): any;
  logout(): void;
}

interface State {}

class AuthBtns extends React.Component<Props, State> {

  renderSignUp() {
    const { isSignUp, openModal } = this.props;
    return (!isSignUp ? <RaisedButton label="Зарегистрироваться" onTouchTap={()=> openModal('signUp')} /> : null);
  }

  loginBox() {
    const { openModal } = this.props;

    return (
      <nav className={css.navigation}>
        <div>
          <div>
            <RaisedButton label="Войти" onTouchTap={ ()=> openModal('signIn') } />
          </div>
          { this.renderSignUp() }
        </div>
      </nav>
    );
  }

  authBox() {
    return (
      <section>
        <div>Вы зарегистрированы!</div>
        <RaisedButton label="Выйти" onTouchTap={ ()=> this.props.logout() }/>
      </section>
    );
  }

  renderContent() {
    const { isAuth } = this.props;
    return (isAuth ? this.authBox() : this.loginBox());
  }

  render() {
    return this.renderContent();
  }
}

export default AuthBtns;