import React, { Component } from 'react'

import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';

import AuthBtns from './components/AuthBtns';
import AuthModal from './components/AuthModal';
import { auth, logout, signUp } from './actions';
import selectors from './selectors';
import { LoginCredentials, SignupCredentials } from './interfaces';

import css from './style.scss';

interface Nav {
	onClick()
}

interface Props {
	auth(LoginCredentials): any;
	signUp(SignupCredentials): any;
	logout(): void;
	isSignUp: boolean;
	isAuth: boolean;
	isFetching: boolean;
	result: any;
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
			signIn: false,
			signUp: false,
			login: '',
			pass: '',
			name: '',
			password: null,
			email: null,
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

		if(!this.props.isSignUp)
			this.props.logout()
	}

	componentWillReceiveProps({ isAuth, isFetching }) {
		if(!isFetching && isAuth)
			this.setState({ open: false })
	}

	signUpUser() {
		const { login, pass, name } = this.state;
		const credentials : SignupCredentials = { email: login, password: pass, name: name };
		this.props.signUp(credentials);
	}

	loginUser() {
		const { login, pass, name } = this.state;
		const credentials : LoginCredentials = { email: login, password: pass };
		this.props.auth(credentials);
	}

	submitHandler() {
		if(this.state.signIn) {
			this.loginUser();
			return;
		}
		
		this.signUpUser();
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
		const { isSignUp } = this.props;
		return !isSignUp ? this.renderSignUpActions() : this.renderLoginActions();
	}

	isSignedUp() {
		return this.state.signUp;
	}

	renderTitle() {
		const { isSignUp } = this.props;
		if (!isSignUp && this.isSignedUp())
			return 'Регистрация';

		return 'Авторизация';
	}

	render() {
	  const { isSignUp, isAuth } = this.props;
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
			               onChange={ this.onChange.bind(this) }
			               { ...this.props } />
		  </section>
	  );
	}
}

const mapStateToProps = state => selectors(state);

const mapDispatchToProps = dispatch => ({
	auth: (data : LoginCredentials) => dispatch(auth(data)),
	signUp: (data : SignupCredentials) => dispatch(signUp(data)),
	logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
