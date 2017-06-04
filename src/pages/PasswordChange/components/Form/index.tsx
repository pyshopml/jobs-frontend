import * as React from 'react'
import { isEmpty } from 'ramda';
import { Spinner } from 'elemental';
import * as classNames from 'classnames';
import { Link } from 'react-router';

import * as css from './style.scss';

interface Props {
  message: string;
  uid: string;
  token: string;
  changePassword: (data: any) => void;
  isLoading: boolean;
};

interface State {
  new_password: string;
  new_password2: string;
};

class Form extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      new_password: '',
      new_password2: '',
    }
  }

  clearState = () => {
    this.setState({
      new_password: '',
      new_password2: '',
    });
  }

  handleUpdate = (evt) => {
    const { name, value } = evt.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    const { uid, token, changePassword } = this.props;
    changePassword(Object.assign({ uid, token }, this.state));
    this.clearState();
  }

  fieldsNotEmpty = () => {
    const { new_password, new_password2 } = this.state;
    return !(isEmpty(new_password) || isEmpty(new_password2));
  }

  passwordsEqual = () => {
    const { new_password, new_password2 } = this.state;
    return new_password === new_password2;
  }

  isDataValid = () => {
    return this.fieldsNotEmpty() && this.passwordsEqual();
  }

  render() {
    const { new_password, new_password2 } = this.state;

    return (
      <article className={ css.container }>
        <form onSubmit={this.handleSubmit} className={css.form}>
          <h2 className={css.title}>Замена пароля</h2>
          <p className={css.message}>{this.props.message}</p>
          <input 
            value={ new_password }
            name="new_password"
            placeholder="Введите новый пароль..."
            className={css.input}
            onChange={ this.handleUpdate }
            type="password" />

          <input 
            value={ new_password2 }
            name="new_password2"
            placeholder="Новый пароль еще раз..."
            className={css.input}
            onChange={ this.handleUpdate }
            type="password" />

          <button
            type="submit"
            className={ classNames(css.button, { [css.buttonDisabled]: !this.isDataValid() }) }
            disabled={ !this.isDataValid() }>
              { this.props.isLoading ? <Spinner size="sm" type="inverted" /> : 'Обновить пароль' }
          </button>
        </form>
        <Link to="/" className={css.link}>
          Перейти на главную
        </Link>
      </article>
    );
  }
}

export default Form;