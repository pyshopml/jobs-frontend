import * as React from 'react'
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

class Alert extends React.Component<Props, null> {
  onSnackbarClose = (reason: string) => {
    if(reason == "clickaway") return;
    this.props.removeFirstNotification();
  };

  onSnackbarCloseClick = () => {
    this.onSnackbarClose("actionTap")
  }

  getNotification (): Notification {
    return this.props.notifications[0];
  }

  notificationDuration = () => {
    let notification = this.getNotification();
    return notification.duration;
  }

  notificationMessage = () => {
    let notification = this.getNotification();
    return notification.message;
  }

  actionClickHandler = () => {
    let notification = this.getNotification();

    return () => {
      notification.triggerAction();
      this.onSnackbarCloseClick();
    }
  }

  actionLabel = () => {
    let notification = this.getNotification()
    return notification.label;
  }

  renderAlert() {
    return (
      <Snackbar open={ true }
                action={ this.actionLabel() }
                onActionTouchTap={ this.actionClickHandler() }
                message={ this.notificationMessage() }
                autoHideDuration={ this.notificationDuration() }
                onRequestClose={ this.onSnackbarClose } />
    );
  }

  render() {
    let notification = this.getNotification();
    return notification ? this.renderAlert() : <div />;
  }
}

const mapStateToProps = state => selectors(state);

const mapDispatchToProps = dispatch => ({
  removeFirstNotification: () => dispatch(removeFirstNotification()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Alert);