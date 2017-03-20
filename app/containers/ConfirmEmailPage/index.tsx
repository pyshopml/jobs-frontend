import * as React from 'react'
import { Link } from 'react-router';

import * as css from './style.scss';

interface Props{};
interface State{};

class ConfirmEmailPageContainer extends React.Component<Props, State> {

  handleSubmit = (evt) => {
    evt.preventDefault();
  }

  render() {
    return (
      <section className={css.container}>
        <section className={css.form}>
        <h2 className={css.title}>Повторное подтверждение почтового адреса</h2>

        <form onSubmit={this.handleSubmit}>
          <input placeholder="Почта, указанная при регистрации" className={css.input} type="email" />
          <button type="submit" className={css.button}>Выслать инструкции</button>
        </form>
        </section>
        <Link className={css.backLink} to="/login">Вернуться</Link>
      </section>
    );
  }
}

export default ConfirmEmailPageContainer;