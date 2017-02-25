import React, { Component } from 'react'
import css from './style.scss';

import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import AuthBtns from './AuthBtns';
import AuthModal from './AuthModal';
import { connect } from 'react-redux';

import {auth, logout, signUp} from './actions';

interface Nav{
	onClick()
}

interface Props{
	auth,
	authState,
	signUp,
	logout():void
}
interface State{}


class Auth extends Component<Props, State> {

	state = {
		open: false,
		signIn:false,
		signUp:false,
		login:'',
		pass:'',
		name:'',
		password:null,
		email:null
	};


	handleOpen = (type:string):void =>{

		this.setState({
			open: true,
			login:'',
			pass:'',
			name:''
		})

		if(type === 'signIn'){
			this.setState({
				signIn: true,
				signUp:false
			})
		}

		if(type === 'signUp'){
			this.setState({
				signIn: false,
				signUp:true
			})

		}

	}

	handleClose = ():void => {
		this.setState({
			open: false
		})

		if(!this.props.authState.isSignUp)
		  this.props.logout()
	 }

	componentWillReceiveProps({authState}){

		if(!authState.isFetching && authState.isAuth){
			this.setState({open: false})
		}

	}

	submitHandler = ():void => {

		if(this.state.signIn){

			const data ={
				email:this.state.login,
				password:this.state.pass
			}

			this.props.auth(data)
		} else {

			const data ={
				email:this.state.login,
				password:this.state.pass,
				name:this.state.name
			}
			this.props.signUp(data)
		}

	}

	onChange = (event: any, newValue: string):void =>{
		this.setState({
			[event.target.name]: newValue.trim()
		})
	}

	logout =():void =>{
    this.props.logout()
		this.setState({open: false})
	}


  render() {
	  const {authState} = this.props,
		      {isSignUp} = authState,

		      submitBtn = this.state.signUp ? 'Зарегистрироваться' : 'Войти',

		      title = !isSignUp ? (this.state.signUp ? 'Регистрация' : 'Авторизация')
                            : null,

	        actions = !isSignUp ? [
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
		                          :
	                              [<FlatButton
													        label='Продолжить'
													        primary={true}
													        keyboardFocused={true}
													        onTouchTap={this.handleClose}
												        />]

    return (
	    <div>

		   <AuthBtns openModal={this.handleOpen.bind(this)}
		             logout ={this.logout.bind(this)}
		             isSignUp={authState.isSignUp}
		             isAuth={authState.isAuth}
		   />

		    <AuthModal title={title}
		               actions={actions}
		               state={this.state}
		               close={this.handleClose}
		               authState={authState}
		               onChange={this.onChange.bind(this)}

		    />

	    </div>
    );
  }
}


export default connect(state =>{
	const authState = state.global.auth
	return {authState }
},{auth, logout, signUp})(Auth)