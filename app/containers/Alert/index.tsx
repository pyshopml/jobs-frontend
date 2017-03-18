import React, { Component } from 'react'
import Snackbar from 'material-ui/Snackbar';
import { connect } from 'react-redux';
import { addNotification, removeFirstNotification } from './actions';
import selectors from './selectors';
import INotification from "../../interfaces/inotification";
import { Notification } from '../../models/Notification';

interface Props {
  notifications: Notification[];
  removeFirstNotification();
};

class Alert extends Component<Props, null> {

  onSnackbarClose = (reason: string) => {
    if(reason == "clickaway") return;
    this.props.removeFirstNotification();
  };

  onSnackbarCloseClick = () => {
    this.onSnackbarClose("actionTap")
  }

  currentNotification = (): Notification => {
    const { notifications } = this.props;
    return notifications[0];
  }

  notificationDuration = () => {
    let notification = this.currentNotification();
    return notification.getDuration();
  }

  notificationMessage = () => {
    let notification = this.currentNotification();
    return notification.getMessage();
  }

  actionClickHandler = () => {
    let notification = this.currentNotification();

    return () => {
      notification.triggerAction();
      this.onSnackbarCloseClick();
    }
  }

  actionLabel = () => {
    let notification = this.currentNotification()
    return notification.getLabel();
  }

  renderAlert() {
    return (
      <Snackbar open={ !!this.currentNotification() }
                action={ this.actionLabel() }
                onActionTouchTap={ this.actionClickHandler() }
                message={ this.notificationMessage() }
                autoHideDuration={ this.notificationDuration() }
                onRequestClose={ this.onSnackbarClose } />
    );
  }

  render() {
    let notification = this.currentNotification();
    return notification ? this.renderAlert() : <div />;
  }
}

const mapStateToProps = state => selectors(state);

const mapDispatchToProps = dispatch => ({
  removeFirstNotification: () => dispatch(removeFirstNotification()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Alert);