import * as React from 'react'
import { Link } from 'react-router';
import { isEmpty } from 'ramda';
import * as classNames from 'classnames';
import { Spinner } from 'elemental';
import { LoginCredentials } from '../../interfaces';

import * as css from './style.scss';
import { validateEmail, validatePassword } from './validation';

interface Props {
  handleSubmit: (data: LoginCredentials) => void;
  message: string;
  isLoading: boolean;
};

interface State {
  email: string;
  password: string;
};

class LoginPage extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    if(!this.areFieldsValid()) return;
    this.props.handleSubmit(this.state);
  }

  handleUpdate = (evt) => {
    const { name, value } = evt.target;
    this.setState({
      [name]: value
    });
  }

  areFieldsValid = () => {
    const { email, password } = this.state;

    return validateEmail(email) && validatePassword(password)
  }

  render() {
    const { email, password } = this.state;

    return (
      <section className={css.container}>
        <section className={css.form}>
          <h2 className={css.title}>Вход</h2>

          <div className={css.errorMessage}>
            {this.props.message}
          </div>

          <form onSubmit={this.handleSubmit}>
            <input 
              value={email}
              name="email"
              placeholder="Почта"
              className={css.input}
              onChange={ this.handleUpdate }
              type="email" />

            <input
              value={password}
              name="password"
              placeholder="Пароль"
              className={css.input}
              onChange={ this.handleUpdate }
              type="password" />

            <button 
              type="submit"
              className={ classNames(css.button, { [css.buttonDisabled]: !this.areFieldsValid() }) }
              disabled={ !this.areFieldsValid() }>
              { this.props.isLoading ? <Spinner size="sm" type="inverted" /> : 'Вход' }
            </button>

          </form>
          <section className={css.footer}>
            <Link className={css.link} to="/restore_password">Напомнить пароль</Link>
            <span>или</span>
            <Link className={css.link} to="/confirm_email">подтвердить почту повторно</Link>
          </section>
        </section>
        <div className={css.signUp}>
          <Link className={css.link} to="/signup">Зарегистрируйте</Link> новый аккаунт
        </div>
      </section>
    );
  }
}

export default LoginPage;