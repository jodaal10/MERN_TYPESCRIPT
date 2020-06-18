import { AnyAction } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import axios from 'axios'
import { User, userActionTypes } from '../types/user';
import { setAlert } from "./alert";
import setAuthToken from "../utils/setToken";

// thunk action
export const register = (user: User): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
    //Invoke store
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
        const config = {
            headers: {
              'Content-Type': 'application/json'
            }
        };
 
        new Promise<void>(async (resolve)=>{
            try {
                const body = JSON.stringify(user);
                const res = await axios.post('/users', body, config);
                dispatch({
                    type: userActionTypes.REGISTER_SUCCESS,
                    payload: res.data
                });

                dispatch(loadUser(user.corporateEmail));

            } catch (error) {
                const errors = error.response.data.errors;
                if (errors) {
                    errors.forEach((err: any) =>{
                        let msg: any = { message: err.msg, alertType: 'danger'};
                        dispatch(setAlert(msg))
                    });
                }
                dispatch({
                    type: userActionTypes.REGISTER_FAIL
                });
            }
          resolve()
        })
    }
  };

export const loadUser = (email: string): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
    //Invoke store
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
        new Promise<void>(async (resolve)=>{
            try {
                if (localStorage.token) {
                    setAuthToken(localStorage.token);
                }   

                const res = await axios.get(`/users/getUserBy/${email}`);
                console.log(res);
                dispatch({
                    type: userActionTypes.USER_LOADED,
                    payload: res.data
                });

            } catch (error) {
                dispatch({
                    type: userActionTypes.AUTH_ERROR
                  });
            }
          resolve()
        })
    }
};

// thunk action
export const login = (corporateEmail: string, password: string): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
    //Invoke store
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
        const config = {
            headers: {
              'Content-Type': 'application/json'
            }
        };
 
        new Promise<void>(async (resolve)=>{
            try {
                const body = JSON.stringify({corporateEmail,password});
                const res = await axios.post('/users/login', body, config);
                dispatch({
                    type: userActionTypes.LOGIN_SUCCESS,
                    payload: res.data
                });

                dispatch(loadUser(corporateEmail));

            } catch (error) {
                const errors = error.response.data.errors;
                if (errors) {
                    errors.forEach((err: any) =>{
                        let msg: any = { message: err.msg, alertType: 'danger'};
                        dispatch(setAlert(msg))
                    });
                }
                dispatch({
                    type: userActionTypes.LOGIN_FAIL
                });
            }
          resolve()
        })
    }
  };

// thunk action
// Logout 
export const logout = (): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
    //Invoke store
    return (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
       
        return  new Promise<void>((resolve)=>{
            dispatch({ type: userActionTypes.LOGOUT });
          resolve()
        })
    }
  };

    

  