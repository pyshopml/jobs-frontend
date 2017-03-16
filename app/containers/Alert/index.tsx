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
  render() {
    const { notifications } = this.props;
    const currentNotification: INotification = notifications[0];
    const action = currentNotification ? currentNotification.action : null;
    const hideDuration = currentNotification ? currentNotification.hideDuration : null;
    return (
      <Snackbar open={ !!currentNotification }
                action={action ? action.label : 'Закрыть'}
                onActionTouchTap={action ?
                 () => {action.onClick(); this.onSnackbarCloseClick()}  :
                 this.onSnackbarCloseClick
                }
                message={ currentNotification ? currentNotification.message : ''}
                autoHideDuration={hideDuration ? hideDuration : 3000}
                onRequestClose={this.onSnackbarClose} />
    );
  }
}

const mapStateToProps = state => selectors(state);

const mapDispatchToProps = dispatch => ({
  removeFirstNotification: () => dispatch(removeFirstNotification()),
  addNotification: (notification: INotification) => dispatch(addNotification(notification))
});

export default connect(mapStateToProps, mapDispatchToProps)(Alert);