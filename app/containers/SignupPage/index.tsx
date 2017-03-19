import * as React from 'react'
import { connect } from 'react-redux';
import Form from './components/Form';
import { SignupCredentials } from './interfaces';
import { submitUserCredentials } from './actions';
import selectors from './selectors';

interface Props {
  submitUserCredentials: (data: SignupCredentials) => void;
  isLoading: boolean;
  message: string;
};

interface State {};

class SignupPageContainer extends React.Component<Props, State> {
  
  handleSubmit = (credentials: SignupCredentials) => {
    this.props.submitUserCredentials(credentials);
  }

  render() {
    return <Form {...this.props} handleSubmit={this.handleSubmit} /> 
  }
}

const mapStateToProps = state => selectors(state);

const mapDispatchToProps = (dispatch) => ({
  submitUserCredentials: (data: SignupCredentials) => dispatch(submitUserCredentials(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupPageContainer);