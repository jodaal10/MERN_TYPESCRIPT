import { Reducer } from "redux";
import { alertState, alertActionTypes } from "../types/alert";

const initialState: alertState = {
  data: []
}

const reducer: Reducer<alertState> = (state = initialState, action) => {
    switch (action.type) {
      case alertActionTypes.SET_ALERT: {
        return { ...state, data: [...state.data, action.payload]};
      }
      case alertActionTypes.REMOVE_ALERT: {
        return {...state, data: state.data.filter(alert => alert.id !== action.payload)}
      }
      default: {
        return state;
      }
    }
  };
  
export { reducer as alertReducer };