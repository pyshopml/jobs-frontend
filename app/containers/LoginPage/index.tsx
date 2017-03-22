import * as React from 'react';
import { connect } from 'react-redux';
import LoginPage from './components/Form';
import selectors from './selectors';
import { loginUser } from './actions';
import { LoginCredentials } from './interfaces';

interface Props { 
  handleSubmit: (data: LoginCredentials) => void;
  message: string;
  isLoading: boolean;
  isLoggedIn: boolean;
};

interface State {};

class LoginPageContainer extends React.Component<Props, State> {

  render() {
    return <LoginPage {...this.props} /> 
  }
  
}

const mapStateToProps = state => selectors(state);

const mapDispatchToProps = dispatch => ({
  handleSubmit: (data: LoginCredentials) => dispatch(loginUser(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPageContainer);