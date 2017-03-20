import * as React from 'react'
import { Link } from 'react-router';
import { Spinner } from 'elemental';
import { connect } from 'react-redux';
import selectors from './selectors';
import { activateAccount } from './actions';

import * as css from './style.scss';

interface Props {
  uid: string;
  token: string;
  isLoading: boolean;
  isAccountActivated: boolean;
  activateAccount: (data: any) => void;
};

interface State {};

class ActivateAccountPage extends React.Component<Props, State> {
  componentDidMount() {
    const { uid, token } = this.props;
    this.props.activateAccount({ uid, token });
  }

  renderStatus = () => {
    const { isAccountActivated } = this.props;
    return isAccountActivated ? 'Аккаунт успешно активирован.' : 'Предоставленные данные не верны.';
  }

  render() {
    const { isLoading } = this.props;

    return (
      <article className={css.container}>
        <section className={css.form}>
          { isLoading ? <Spinner size="md" /> : <h2 className={css.title}>{ this.renderStatus() }</h2> }
        </section>
        <Link to="/" className={css.link}>
          Перейти на главную
        </Link>
      </article>
    );
  }
}

const mapStateToProps = (state, props) => selectors(state, props);

const mapDispatchToProps = dispatch => ({
  activateAccount: (data: any) => dispatch(activateAccount(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ActivateAccountPage);