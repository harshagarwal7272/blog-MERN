import axios from 'axios';
import { POST_SUCCESS, GET_ITEMS, ITEMS_LOADING, GET_STORY } from './types';
import { returnErrors } from './errorActions';
import { tokenConfig } from './authActions';

// Add post
export const addPost = ({ author, authorEmail, title, description, imageID }) => (dispatch, getState) => {

	// request body
	const body = JSON.stringify({ author, authorEmail, title, description, imageID });

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

export const getStory = ({ _id }) => ( dispatch, getState ) => {

		// Headers
		const config = {
			headers: {
				"Content-type": "application/json"
			}
		}

		console.log(" HI " + _id);

		const body = JSON.stringify({ _id });

		axios
		.post('/api/posts/story', body, config)
		.then(res =>
			dispatch({
				type: GET_STORY,
				payload: res.data
			})
			)
	}

//create a new variant of getPosts 
export const getPosts = ({ userEmail }) => ( dispatch ) => {

	console.log("phew ");
	console.log(userEmail);

	dispatch(setItemsLoading());
	console.log("I went asking for items");

	// Headers
	const config = {
		headers: {
			"Content-type": "application/json"
		}
	}

	const body = JSON.stringify({ userEmail });

	axios
		.post('/api/posts', body, config)
		.then(res =>
			dispatch({
				type: GET_ITEMS,
				payload: res.data
			})
		)
		.catch(err => {
			dispatch(returnErrors(err.response, err.response.status));
		});
};

export const setItemsLoading = () => {
	return {
		type: ITEMS_LOADING
	}
};