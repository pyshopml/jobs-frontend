import * as React from 'react'
import { connect } from 'react-redux';
import selectors from './selectors';
import { changePassword } from './actions';
import Form from './components/Form';

interface Props {
  message: string;
  uid: string;
  token: string;
  changePassword: (data: any) => void;
  isLoading: boolean;
};

interface State {};

/*
{this.props.params.uid}:
{this.props.params.token}
*/

class PasswordChangePage extends React.Component<Props, State> {

  render() {
    return <Form {...this.props} />
  }
  
}

const mapStateToProps = (state, props) => selectors(state, props);

const mapDispatchToProps = dispatch => ({
  changePassword: (data: any) => dispatch(changePassword(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PasswordChangePage);