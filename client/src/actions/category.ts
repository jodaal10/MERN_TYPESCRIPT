import { AnyAction } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import axios from 'axios'
import { setAlert } from "./alert";
import { Category, categoryActionTypes } from '../types/category';

// thunk action
export const getCategories = (): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
    //Invoke store
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {

        new Promise<void>(async (resolve)=>{
            try {
                const res = await axios.get('/category');
                dispatch({
                    type: categoryActionTypes.GET_CATEGORIES,
                    payload: res.data
                });
            } catch (error) {
                const errors = error.response.data.errors;
                if (errors) {
                    errors.forEach((err: any) =>{
                        let msg: any = { message: err.msg, alertType: 'danger'};
                        dispatch(setAlert(msg))
                    });
                }
            }
          resolve()
        })
    }
};

// thunk action
export const createCategory = (category: Category): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
    //Invoke store
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
        const config = {
            headers: {
              'Content-Type': 'application/json'
            }
        };
        new Promise<void>(async (resolve)=>{
            try {
                var req = { categoryName:category.categoryName,}
                const body = JSON.stringify({
                                    categoryName:category.categoryName,
                                    type: category.type
                                });
                const res = await axios.post('/category', body, config);
                dispatch({
                    type: categoryActionTypes.ADD_CATEGORY,
                    payload: res.data
                });
                
                let msg: any = { message: 'Category created', alertType: 'success'};
                dispatch(setAlert(msg))
            } catch (error) {
                console.log(error)
                const errors = error.response.data.errors;
                if (errors) {
                    errors.forEach((err: any) =>{
                        let msg: any = { message: err.msg, alertType: 'danger'};
                        dispatch(setAlert(msg))
                    });
                }
            }
          resolve()
        })
    }
};