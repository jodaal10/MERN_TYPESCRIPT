import { Reducer } from "redux";
import { categoryState, categoryActionTypes } from "../types/category";

const initialState: categoryState = {
    categories: [],
    loading: true,
 }
 
 const reducer: Reducer<categoryState> = (state = initialState, action) => {
    switch (action.type) {
        case categoryActionTypes.GET_CATEGORIES: {
          return { ...state, 
                    categories: action.payload,
                    loading: false
                };
        }
        case categoryActionTypes.ADD_CATEGORY: {
            return { ...state, 
                      categories: [...state.categories,action.payload],
                      loading: false
                  };
          }
        default: {
          return state;
        }
      }
  };
   
 export { reducer as categoryReducer };