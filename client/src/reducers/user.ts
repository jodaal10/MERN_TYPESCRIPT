import { Reducer } from "redux";
import { userState, userActionTypes } from '../types/user';

const initialState: userState = {
   user: {
    id: 0,
    firstName: '',
    lastName: '',
    corporateEmail: ''
   },
   loading: true,
   isAuthenticated: false,
   token:  localStorage.getItem('token')?.toString()
}

const reducer: Reducer<userState> = (state = initialState, action) => {
    switch (action.type) {
      case userActionTypes.USER_LOADED:
        return {
            ...state,
            isAuthenticated: true,
            loading: false,
            user: action.payload
        };
      case userActionTypes.LOGIN_SUCCESS: 
      case userActionTypes.REGISTER_SUCCESS: {
        localStorage.setItem('token',action.payload.token);
        return { 
            ...state,
            isAuthenticated:true,
            loading:false, 
            user: action.payload,
            token: action.payload.token
        };
      }
      case userActionTypes.REGISTER_FAIL:
      case userActionTypes.AUTH_ERROR:
      case userActionTypes.LOGIN_FAIL:
      case userActionTypes.LOGOUT:
        localStorage.removeItem('token');
            return {
                ...state,
                token: '',
                isAuthenticated: false,
                loading: false,
            };
      default: {
        return state;
      }
    }
  };
  
export { reducer as userReducer };