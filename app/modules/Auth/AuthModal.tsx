import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import css from './style.scss';

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

		      status: any = isFetching ? <div className="loading">Loading</div> : actions,

		      nameField = state.signUp ? <TextField  hintText="Ваше имя"
		                                              name='name'
		                                              value={state.name}
		                                              onChange={onChange}
		                                              type='text'
		                                              errorText={null}
		                                              style={styleInput}
		                                  />
			                             : null,

		      content = !isSignUp ? <div>
															      {nameField}
															      <TextField
																      hintText="Email"
																      errorText={email || non_field_errors ? email || non_field_errors : null}
																      value={state.login}
																      type='email'
																      name='login'
																      onChange={onChange}
																      style={styleInput}
															      />
															      <TextField
																      hintText="Пароль"
																      errorText={password || non_field_errors ? password || non_field_errors : null}
																      value={state.pass}
																      type='text'
																      name='pass'
																      onChange={onChange}
																      style={styleInput}
															      />
												        </div>
												      : <div>{`${name}, вы зарегистрированы, проверьте свою почту!`}</div>


    return (
	    <Dialog
		    title={title}
		    actions={status}
		    open={state.open}
		    onRequestClose={close}
		    style={styleModal.style}
		    actionsContainerStyle={styleModal.actionsContainer}
	    >
		    {content}
	    </Dialog>

    )
  }
}

export default AuthModal;