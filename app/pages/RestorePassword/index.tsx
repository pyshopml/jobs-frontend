import * as React from 'react'
import { Link } from 'react-router';
import { isEmpty } from 'ramda';
import * as classNames from 'classnames';
import { connect } from 'react-redux';
import selectors from './selectors';
import { Spinner } from 'elemental';
import { submitEmail, goBackHandler } from './actions';

import * as css from './style.scss';

interface Props {
  handleSubmit: (email: string) => void;
  message: string;
  isLoading: boolean;
  goBackHandler: () => void;
};

interface State {
  email: string;
};

class RestorePasswordContainer extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
    }
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    this.props.handleSubmit(this.state.email);
  }

  isDataValid = () => {
    return !isEmpty(this.state.email);
  }

  updateEmail = (evt) => {
    const { name, value } = evt.target;
    this.setState({
      [name]: value
    });
  }

  renderMessage() {
    return (
      <div className={css.errorMessage}>
        {this.props.message}
      </div>
    );
  }

  goBackHandler = (evt) => {
    evt.preventDefault();
    this.props.goBackHandler();
  }

  render() {
    return (
      <section className={css.container}>
        <section className={css.form}>
        <h2 className={css.title}>Восстановление пароля</h2>

        { this.renderMessage() }

        <form onSubmit={this.handleSubmit}>
          <input 
            name="email"
            placeholder="Почта, указанная при регистрации" 
            className={css.input}
            value={this.state.email}
            onChange={this.updateEmail}
            type="email" />

          <button
            type="submit"
            className={ classNames(css.button, { [css.buttonDisabled]: !this.isDataValid() }) }>
              { this.props.isLoading ? <Spinner size="sm" type="inverted" /> : 'Выслать инструкции' }
          </button>
        </form>
        </section>
        <Link className={css.backLink} onClick={this.goBackHandler} to="/login">
          Вернуться
        </Link>
      </section>
    );
  }
}

const mapStateToProps = state => selectors(state);

const mapDispatchToProps = dispatch => ({
  handleSubmit: (email: string) => dispatch(submitEmail(email)),
  goBackHandler: () => dispatch(goBackHandler())
});

export default connect(mapStateToProps, mapDispatchToProps)(RestorePasswordContainer);