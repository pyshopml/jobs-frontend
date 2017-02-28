import {
	AUTH_FETCHING,
	AUTH_SUCCESS,
	LOGOUT,
	SIGN_UP
} from './constants';

//import IPost from '../../interfaces/ipost'


const initialState = {
  isFetching:false,
  isSuccess:false,
  isError:false,
	result:{},
	isAuth:false,
	isSignUp:false,
	error:''
}

export default(state = initialState, action) =>{

  switch (action.type) {
    case AUTH_FETCHING:
      return {
	      ...state,
        isFetching:true,
	      isSuccess:false,
	      isError:false,
	      isSignUp:false,
      }

    case AUTH_SUCCESS:
	    const isAuth = action.payload.auth_token ? true : false
      return {
	      ...state,
        isSuccess:true,
	      isFetching:false,
	      isError:false,
	      result:action.payload,
	      isAuth:isAuth,
	      error:''
      }

	  case LOGOUT:
		  return {
			  ...state,
			  isFetching:false,
			  isSuccess:false,
			  isError:false,
			  isAuth:false,
			  result:{},
			  error:''
		  }

	  case SIGN_UP:
		  return {
			  isFetching:false,
			  isSuccess:false,
			  isError:false,
			  isAuth:false,
			  isSignUp:true,
			  result:action.payload,
			  error:''
		  }

	  case 'SIGN_UP_ERROR':
		  return {
			  isFetching:false,
			  isSuccess:false,
			  isError:false,
			  isAuth:false,
			  isSignUp:false,
			  result:action.payload,
			  error:''
		  }

    default:
      return state;
  }
}