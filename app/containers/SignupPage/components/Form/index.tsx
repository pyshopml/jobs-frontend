import * as React from 'react'
import { Link } from 'react-router';
import { isEmpty } from 'ramda';
import * as classNames from 'classnames';
import { Spinner } from 'elemental';
import { SignupCredentials } from '../../interfaces';

import * as css from './style.scss';

interface Props {
  handleSubmit(data: SignupCredentials): void;
  message: string;
  isLoading: boolean;
};

interface State {
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

class SignuPage extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    };  
  }

  handleUpdate = (evt) => {
    const { name, value } = evt.target;
    this.setState({
      [name]: value
    });
  }

  clearState = () => {
    this.setState({
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    });
  }

  handleSubmit = (evt) => {
    evt.preventDefault();

    if(this.isDataValid()) {
      this.props.handleSubmit(this.state);
      this.clearState();
    }
  }

  arePasswordsEqual = () => {
    const { password, passwordConfirmation } = this.state;
    return password === passwordConfirmation;
  }

  areFieldsFilled = () => {
    const { username, email, password } = this.state;
    return !(isEmpty(username) || isEmpty(email) || isEmpty(password));
  }

  isDataValid = () => {
    return (this.areFieldsFilled() && this.arePasswordsEqual());
  }

  isErrorMsgAvailable = () => {
    return !isEmpty(this.props.message);
  }

  errorMessage() {
    return (
      <div className={ classNames(css.errorMessage, { [css.hidden]: !this.isErrorMsgAvailable() }) }>
        {this.props.message}
      </div>
    );
  }

  render() {
    const { username, email, password, passwordConfirmation } = this.state;

    return (
      <section className={css.container}>
        <section className={css.form}>
          <h2 className={css.title}>Регистрация</h2>

          { this.errorMessage() }

          <form onSubmit={this.handleSubmit}>
            <input 
              placeholder="e.g., Hermione Granger" 
              className={css.input} 
              type="text" 
              value={username} 
              name="username"
              onChange={this.handleUpdate}
               />

            <input 
              placeholder="Почта" 
              className={css.input} 
              type="email" 
              value={email} 
              name="email"
              onChange={this.handleUpdate}
               />

            <input 
              placeholder="Пароль" 
              className={css.input} 
              type="password"
              value={password}
              name="password"
              onChange={this.handleUpdate}
               />

            <input 
              placeholder="Повторите пароль"
              className={css.input}
              type="password"
              value={passwordConfirmation}
              name="passwordConfirmation"
              onChange={this.handleUpdate}
              />

            <button 
              type="submit"
              className={classNames(css.button, { [css.buttonDisabled]: !this.isDataValid() })} 
              disabled={ !this.isDataValid() }>
                { this.props.isLoading ? <Spinner size="sm" type="inverted" /> : 'Зарегистрироваться' }
            </button>
          </form>
          <section className={css.footer}>
            <span>Регистрируясь вы принимаете условия </span>
            <Link className={css.link} to="/confirm_email">Пользовательского соглашения</Link>
          </section>
        </section>
        <div className={css.loginLink}>
          <Link className={css.link} to="/login">Войдите</Link> с вашим аккаунтом
        </div>
      </section>
    );
  }
}

export default SignuPage;