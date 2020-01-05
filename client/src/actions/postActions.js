import axios from 'axios';
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from './types';
import { returnErrors } from './errorActions';

export const getPosts = () => dispatch => {
	dispatch(setItemsLoading());
	console.log("I went asking for items");
	axios
		.get('/api/posts')
		.then(res =>
			dispatch({
				type: GET_ITEMS,
				payload: res.data
			})
		)
		.catch(err => {
			dispatch(returnErrors(err.response.data, err.response.status));
		});
};

export const setItemsLoading = () => {
	return {
		type: ITEMS_LOADING
	}
};