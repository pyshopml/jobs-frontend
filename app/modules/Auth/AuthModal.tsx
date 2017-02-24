import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import css from './style.scss';



interface Props{
	title:string,
	actions:any,
	state:any,
	close():void,
	authState:any,
	onChange():void
}
interface State{}

class AuthModal extends Component<Props, State> {
  render() {
	  const {authState, title, actions, state,close, onChange} = this.props,
		      {isSignUp,isFetching, result:{email,password,name, non_field_errors}} = authState,

		      loading = isFetching ? <div className="loading">Loading</div> : null,

		      nameField = state.signUp ? <TextField  hintText="Ваше имя"
		                                              name='name'
		                                              value={state.name}
		                                              onChange={onChange}
		                                              type='text'
		                                              errorText={null}/>
			                             : null,

		      content = !isSignUp ? <div>
															      {nameField}
															      {loading}
															      <TextField
																      hintText="Email"
																      errorText={email || non_field_errors ? email || non_field_errors : null}
																      value={state.login}
																      type='email'
																      name='login'
																      onChange={onChange}
															      />
															      <TextField
																      hintText="Пароль"
																      errorText={password || non_field_errors ? password || non_field_errors : null}
																      value={state.pass}
																      type='text'
																      name='pass'
																      onChange={onChange}
															      />
												        </div>
												      : <div>{`${name}, вы зарегистрированы, проверьте свою почту!`}</div>


    return (
	    <Dialog
		    title={title}
		    actions={actions}
		    open={state.open}
		    onRequestClose={close}
	    >
		    {content}
	    </Dialog>

    )
  }
}

export default AuthModal;