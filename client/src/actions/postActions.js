import axios from 'axios';
import { POST_SUCCESS, GET_ITEMS, ITEMS_LOADING } from './types';
import { returnErrors } from './errorActions';
import { tokenConfig } from './authActions';

// Add post
export const addPost = ({ author, title, description, imageID }) => (dispatch, getState) => {

	// request body
	const body = JSON.stringify({ author, title, description, imageID });

	// Headers
	const config = {
		headers: {
			"Content-type": "application/json"
		}
	}

	axios
		.post('/api/posts/addPost', body, config)
		.then(res =>
			dispatch({
				type: POST_SUCCESS,
				payload: res.data
			})
		)
		.catch(err => {
			dispatch(
				returnErrors(err.response, err.response)
			);
		});	
};

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