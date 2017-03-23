import * as React from 'react'
import * as FontAwesome from 'react-fontawesome';
import { FlatButton, Popover, Menu, MenuItem } from 'material-ui';

interface Props {};

interface State {
  open: boolean;
  anchorEl: any;
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

  render() {
    return (
      <section>
        <FlatButton
          onTouchTap={this.handleTouchTap}
          label="John Gold"
          icon={ <FontAwesome name="user" /> }
        />

        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'right', vertical: 'top' }}
          onRequestClose={this.handleRequestClose}
        >
          <Menu>
            <MenuItem primaryText="Refresh" />
            <MenuItem primaryText="Help &amp; feedback" />
            <MenuItem primaryText="Settings" />
            <MenuItem primaryText="Sign out" />
          </Menu>
        </Popover>
      </section>
    );
  }
}


export default AuthBar;