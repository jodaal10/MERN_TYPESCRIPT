import {v4 as uuidv4} from 'uuid';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { alertActionTypes, Alert } from '../types/alert';

// thunk action
export const setAlert = (item: Alert): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  //Invoke store
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
      const id = uuidv4();
      item.id = id;
      setTimeout(()=> dispatch({type: alertActionTypes.REMOVE_ALERT, payload: id}),5000);
      return  new Promise<void>((resolve)=>{
        dispatch({
          type: alertActionTypes.SET_ALERT,
          payload: item
        })
        resolve()
      })
  }
};
