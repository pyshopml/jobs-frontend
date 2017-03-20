import * as React from 'react'
import { Link } from 'react-router';
import { connect } from 'react-redux';
import selectors from './selectors';

import * as css from './style.scss';

interface Props {
  email: string;
};

interface State {};

class InfoPageContainer extends React.Component<Props, State> {
  render() {
    return (
      <section className={css.container}>
        <section className={css.form}>
          <h2 className={css.title}>Подтвердите регистрацию</h2>
          <p className={css.text}>По адресу <span className={css.email}>{this.props.email}</span> вам выслано письмо со ссылкой: перейдите по ней,
            чтобы подтвердить свою почту и завершить регистрацию.</p>

          <p className={css.text}>Если вы не видите письма во входящих, проверьте папку со спамом,
            а также другие папки, в которые письмо может попасть.</p>

          <p className={css.text}>
            Или <Link to="/confirm_email" className={css.link}>отправьте письмо повторно.</Link>
          </p>
        </section>
        <Link className={css.backLink} to="/login">Вернуться</Link>
      </section>
    );
  }
}

const mapStateToProps = state => selectors(state);

export default connect(mapStateToProps)(InfoPageContainer);