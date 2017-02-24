import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton';

import css from './style.scss';



interface Props{
	isAuth:boolean,
	isSignUp:boolean,
	openModal
	logout():void
}
interface State{}

class AuthBtns extends Component<Props, State> {
  render() {
	  const {isAuth, isSignUp, openModal, logout} = this.props,

	         signBtn = !isSignUp ?
			                          <RaisedButton label="Зарегистрироваться"
			                                        onTouchTap={()=> openModal('signUp')}
			                          />
		                          : null,

	         btns = isAuth ? <div>
		                        <div>Вы зарегистрированы!</div>
		                        <RaisedButton label="Выйти" onTouchTap={()=> logout()}/>
	                        </div>
		                    :
												  <nav className={css.navigation}>
													  <div>
														  <div>
															  <RaisedButton label="Войти" onTouchTap={()=> openModal('signIn')} />
														  </div>
														  {signBtn}
													  </div>
												  </nav>
    return (
	    <div>
	        {btns}
	    </div>

    )
  }
}

export default AuthBtns;