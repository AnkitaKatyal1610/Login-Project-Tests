import { combineReducers } from 'redux';
import auth from './reducer';
import user from './userReducer';

export const rootReducer = combineReducers({ auth, user })