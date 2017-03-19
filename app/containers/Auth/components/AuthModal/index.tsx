import * as React from 'react'
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

const styleModal={
  style:{
    maxWidth:'600px',
    margin: '0 auto',
    right: 0
  },
  actionsContainer:{
    height:'52px'
  }

}

const styleInput={
 width:'100%'
}

interface Props {
  title: string,
  actions: any,
  state: any,
  close(): void,
  onChange(): void,
  isSignUp: boolean,
  result: any,
  isFetching: boolean,
}

interface State {}

class AuthModal extends React.Component<Props, State> {

  nameField() {
    const { state: { signUp, name } } = this.props;
    if (signUp) {
      return (
        <TextField
          hintText="Ваше имя"
          name='name'
          value={ name }
          onChange={ this.props.onChange }
          type='text'
          errorText={null}
          style={styleInput} />
      )
    }
  }

  renderSingUpForm() {
    const { 
      onChange, 
      state: { login, pass }, 
      result:{ email, password, name, non_field_errors } 
    } = this.props;

    return (
      <section>
          { this.nameField() }
          <TextField
            hintText="Email"
            errorText={ email || non_field_errors ? email || non_field_errors : null }
            value={login}
            type='email'
            name='login'
            onChange={ onChange }
            style={ styleInput }
          />
          <TextField
            hintText="Пароль"
            errorText={password || non_field_errors ? password || non_field_errors : null}
            value={pass}
            type='password'
            name='pass'
            onChange={ onChange }
            style={ styleInput }
          />
      </section>
    );
  }

  currentStatus() {
    const { isFetching, actions } = this.props;
    return isFetching ? <div className="loading">Loading</div> : actions;
  }

  renderContent() {
    const { isSignUp, result: { name } } = this.props;

    if (isSignUp) 
      return <section>{`${name}, вы зарегистрированы, проверьте свою почту!`}</section>;

    return this.renderSingUpForm();
  }


  render() {
    const { title, actions, state,close, onChange, isFetching } = this.props;

    return (
      <Dialog
        title={ title }
        actions={ this.currentStatus() }
        open={ state.open }
        onRequestClose={ close }
        style={ styleModal.style }
        actionsContainerStyle={ styleModal.actionsContainer }
        actionsContainerClassName={ 'actions-container' } >

          { this.renderContent() }

      </Dialog>

    );
  }
}

export default AuthModal;