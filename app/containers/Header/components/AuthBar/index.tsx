import * as React from 'react'
import * as FontAwesome from 'react-fontawesome';
import { Avatar, Divider, FlatButton, Popover, Menu, MenuItem } from 'material-ui';

import * as css from './style.scss';

interface Props {
  logoutUser: () => void;
};

interface State {
  open: boolean;
  anchorEl: any;
};

const styles = {
  uploadButton: {
    verticalAlign: 'middle',
  },
  avatar: {
    marginRight: -6,
  },
  authButton: {
    paddingTop: 4,
    paddingBottom: 10,
    paddingLeft: 14,
    paddingRight: 14,
    fontSize: 12,
    marginTop: 4,
    height: 40,
  },
  menuItem: {
    fontSize: 15,
  }
};

class AuthBar extends React.Component<Props, State> {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
      anchorEl: null,
    };
  }

  handleTouchTap = (event) => {
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  }

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  }

  handleLogout = () => {
    this.props.logoutUser();
  }

  render() {
    return (
      <section>
        <FlatButton
          style={styles.authButton}
          onTouchTap={this.handleTouchTap}
          label="John Gold">
           <Avatar
            icon={<FontAwesome name="user" />}
            style={styles.avatar}
            size={30}
          />
        </FlatButton>

        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'right', vertical: 'top' }}
          onRequestClose={this.handleRequestClose}
        >
          <Menu>
            <MenuItem primaryText="Ваш профиль" style={ styles.menuItem }/>
            <MenuItem primaryText="Панель управления" style={ styles.menuItem } />
            <Divider />
            <MenuItem primaryText="Выйти" style={ styles.menuItem } onClick={ this.handleLogout } />
          </Menu>
        </Popover>
      </section>
    );
  }
}


export default AuthBar;