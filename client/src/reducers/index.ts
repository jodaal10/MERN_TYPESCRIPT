import {combineReducers} from 'redux';
import {alertReducer} from './alert';
import { alertState } from '../types/alert';
import { userState } from '../types/user';
import {userReducer}  from './user'
import { categoryReducer } from './category';
import { Category, categoryState } from '../types/category';

export interface ApplicationState {
    alert: alertState;
    user: userState;
    category: categoryState;
  }

export default combineReducers({
    alert: alertReducer,
    user: userReducer,
    category: categoryReducer
});