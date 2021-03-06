import {
	USER_LOADED,
	USER_LOADING,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT_SUCCESS,
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	GET_AUTHOR_SUCCESS,
	GET_AUTHOR_FAIL,
	FOLLOW_SUCCESSFUL,
	FOLLOW_FAIL,
	UPDATE_SUCCESS,
	UPDATE_FAIL
} from '../actions/types';

const initialState = {
	token: localStorage.getItem('token'),
	isAuthenticated: null,
	isLoading: false,
	user: null,
	socialAuth: false,
	authorData: null
};

export default function(state = initialState, action) {
	switch(action.type) {
		case USER_LOADING:
			return {
				...state,
				isLoading: true
			};
		case USER_LOADED:
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				user: action.payload
			};
		case LOGIN_SUCCESS:
		case REGISTER_SUCCESS:
		localStorage.setItem('token', action.payload.token);
			return {
				...state,
				...action.payload,
				isAuthenticated: true,
				isLoading: false
			};
		case AUTH_ERROR:
		case LOGIN_FAIL:
		case LOGOUT_SUCCESS:
		case REGISTER_FAIL:
			localStorage.removeItem('token');
			return {
				...state,
				token: null,
				user: null,
				isAuthenticated: false,
				isLoading: false
			}
		case GET_AUTHOR_SUCCESS:
			return {
				...state,
				isLoading: false,
				authorData: action.payload
			}
		case GET_AUTHOR_FAIL:
			return {
				...state,
				isLoading: false
			}
		case UPDATE_SUCCESS:
		case UPDATE_FAIL:
		    return {
		        ...state
		    }
		default:
			return state;
	}
}
