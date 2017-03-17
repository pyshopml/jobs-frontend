import React, { Component } from 'react'
import Snackbar from 'material-ui/Snackbar';
import { connect } from 'react-redux';
import { addNotification, removeFirstNotification } from './actions';
import selectors from './selectors';
import INotification from "../../interfaces/inotification";

interface Props{
  notifications: INotification[];
  removeFirstNotification();
  addNotification(notification: INotification)
};

class Alert extends Component<Props, null> {

  onSnackbarClose = (reason: string) => {
    if(reason == "clickaway") return;
    this.props.removeFirstNotification();
  };

  onSnackbarCloseClick = () => {
    this.onSnackbarClose("actionTap")
  }

  currentNotification = (): INotification => {
    const { notifications } = this.props;
    return notifications[0];
  }

  notificationAction = () => {
    let notification = this.currentNotification();
    return notification ? notification.action : null
  }

  notificationDuration = () => {
    let notification = this.currentNotification();
    return notification ? notification.hideDuration : 3000
  }

  notificationMessage = () => {
    let notification = this.currentNotification();
    return notification ? notification.message : ''
  }

  actionClickHandler = () => {
    let action = this.notificationAction();

    const actionClick = () => {
      action.onClick()
      this.onSnackbarCloseClick() 
    };

    return action ? actionClick : this.onSnackbarCloseClick;
  }

  actionLabel = () => {
    let action = this.notificationAction();
    return action ? action.label : 'Закрыть';
  }

  render() {
    const action = this.notificationAction();

    return (
      <Snackbar open={ !!this.currentNotification() }
                action={ this.actionLabel() }
                onActionTouchTap={ this.actionClickHandler }
                message={ this.notificationMessage() }
                autoHideDuration={ this.notificationDuration() }
                onRequestClose={ this.onSnackbarClose } />
    );
  }
}

const mapStateToProps = state => selectors(state);

const mapDispatchToProps = dispatch => ({
  removeFirstNotification: () => dispatch(removeFirstNotification()),
  addNotification: (notification: INotification) => dispatch(addNotification(notification))
});

export default connect(mapStateToProps, mapDispatchToProps)(Alert);