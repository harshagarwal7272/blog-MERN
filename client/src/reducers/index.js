import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import postReducer from './postReducer';


// we can have any number of reducers we want, and export them from here.
export default combineReducers({
	error: errorReducer,
	auth: authReducer,
	post: postReducer
});