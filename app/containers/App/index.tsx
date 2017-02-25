import React, { Component } from 'react'
import Header from '../../components/Header';
import Snackbar from 'material-ui/Snackbar';
import { connect } from 'react-redux';
import { addNotification, removeFirstNotification } from './actions'

import AddButton from '../../components/AddPostButton';

import css from './style.css';

interface Props{
  notifications: any;
  removeFirstNotification();
  addNotification(message: string)
};
interface State{
  autoSnackbarHideDuration: number
};

class App extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      autoSnackbarHideDuration: 2000,
    };
  }
  public static childContextTypes = {
    addNotification: React.PropTypes.func
  };
  getChildContext() {
    return { addNotification: this.props.addNotification };
  }
  onSnackbarClose = (reason: string) => {
    if(reason == "clickaway") return;
    this.props.removeFirstNotification();
  };
  onSnackbarCloseClick = () => {
    this.onSnackbarClose("actionTap")
  }
  render() {
    const notificationMessage = this.props.notifications[0] || '';
    return (
      <section className={css.app}>
        <Header />
        <section className={css.container}>
          { this.props.children }
        </section>

        <Snackbar open={ !!notificationMessage }
                  action="close"
                  onActionTouchTap={this.onSnackbarCloseClick}
                  message={ notificationMessage }
                  autoHideDuration={this.state.autoSnackbarHideDuration}
                  onRequestClose={this.onSnackbarClose} />
        <AddButton />
      </section>
    );
  }
}

const mapStateToProps = state =>({
  notifications: state.global.app.notifications
})

const mapDispatchToProps = dispatch => ({
  removeFirstNotification: () => dispatch(removeFirstNotification()),
  addNotification: (message: string) => dispatch(addNotification(message))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);