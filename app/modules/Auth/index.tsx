import React, { Component } from 'react'
import css from './style.scss';

import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';

import AuthBtns from './AuthBtns';
import AuthModal from './AuthModal';
import { auth, logout, signUp } from './actions';

interface Nav {
	onClick()
}

interface Props {
	auth,
	authState,
	signUp,
	logout():void
}

interface State {
	open: boolean,
	signIn: boolean,
	signUp: boolean,
	login: string,
	pass: string,
	name: string,
	password: any,
	email: any
}

class Auth extends Component<Props, State> {
	constructor(props) {
		super(props);

		this.state = {
			open: false,
			signIn:false,
			signUp:false,
			login:'',
			pass:'',
			name:'',
			password:null,
			email:null
		};

		this.handleOpen = this.handleOpen.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.submitHandler = this.submitHandler.bind(this);
		this.logout = this.logout.bind(this);
		this.onChange = this.onChange.bind(this);
	}

 handleOpen (type:string) {
 	const newState = {
		open: true,
		login:'',
		pass:'',
		name:''
	};

	if (type === 'signIn') {
		Object.assign(newState, {
			signIn: true,
			signUp: false
		});
	}

	if (type === 'signUp') {
		Object.assign(newState,{
			signIn: false,
			signUp:true
		});
	}

	this.setState(newState);
}

handleClose() {
	this.setState({ open: false });

	if(!this.props.authState.isSignUp)
	  this.props.logout()
 }

componentWillReceiveProps({ authState }) {

	if(!authState.isFetching && authState.isAuth){
		this.setState({open: false})
	}
}

submitHandler() {
	const { signIn, login, pass, name } = this.state;

	if(signIn) {
		this.props.auth({ email: login, password: pass });
		return;
	}

	this.props.signUp({
		email:login,
		password:pass,
		name:name
	});
}

onChange(event: any, newValue: string) {
	this.setState({
		[event.target.name]: newValue.trim()
	});
}

logout() {
  this.props.logout();
	this.setState({ open: false });
}

renderSignUpActions() {
	const submitBtn = this.state.signUp ? 'Зарегистрироваться' : 'Войти';

	return (
		[
		<FlatButton
		  label={submitBtn}
		  primary={true}
		  onTouchTap={this.submitHandler.bind(this)}
	  />,
	  <FlatButton
		  label='Отмена'
		  primary={true}
		  keyboardFocused={true}
		  onTouchTap={this.handleClose}
	  />
	 	]
	);
}

renderLoginActions() {
	return (
		[
			<FlatButton
	      label='Продолжить'
	      primary={true}
	      keyboardFocused={true}
	      onTouchTap={this.handleClose}
	    />
	  ]
	);
}

renderActions() {
	const { authState: { isSignUp } } = this.props;
	return !isSignUp ? this.renderSignUpActions() : this.renderLoginActions();
}

isSignedUp() {
	return this.state.signUp;
}

renderTitle() {
	const { authState: { isSignUp } } = this.props;
	if (!isSignUp && this.isSignedUp())
		return 'Регистрация';

	return 'Авторизация';
}

render() {
  const { authState: { isSignUp, isAuth } } = this.props;
  // const title = !isSignUp ? (this.state.signUp ? 'Регистрация' : 'Авторизация') : null;
  
  return (
	    <section>
		   <AuthBtns openModal={ this.handleOpen }
		             logout ={ this.logout }
		             isSignUp={ isSignUp }
		             isAuth={ isAuth }
		   />

		    <AuthModal title={ this.renderTitle() }
		               actions={ this.renderActions() }
		               state={ this.state }
		               close={ this.handleClose }
		               authState={ this.props.authState }
		               onChange={ this.onChange.bind(this) } />
	    </section>
  	);
  }
}


export default connect(state =>{
	const authState = state.global.auth
	return {authState }
},{auth, logout, signUp})(Auth)