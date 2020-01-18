import uuid from 'uuid';
import { POST_SUCCESS, GET_ITEMS, ADD_ITEM, ITEMS_LOADING, GET_STORY } from '../actions/types';

const initialState = {
	posts: [],
	loading: false
}

export default function(state = initialState, action) {
	switch(action.type) {
		case GET_ITEMS:
			return {
				...state,
				posts: action.payload,
				loading: false
			};
		case GET_STORY:
			return {
				...state,
				story: action.payload,
				loading: false
			}
		case POST_SUCCESS:
			localStorage.setItem('token', action.payload.token);
			return {
				...state,
				...action.payload,
				isAuthenticated: true,
				isLoading: false
			};
		case ADD_ITEM:
			return {
				...state,
				items: [action.payload, ...state.items]
			};
		case ITEMS_LOADING:
			return {
				...state,
				loading: true
			};
		default:
			return state;
	}
}