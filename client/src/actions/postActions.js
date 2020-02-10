import axios from 'axios';
import { POST_SUCCESS, GET_ITEMS, ITEMS_LOADING, GET_STORY, GET_SIMILAR_ITEMS } from './types';
import { returnErrors } from './errorActions';
import { tokenConfig } from './authActions';

// Add post
export const addPost = ({ author, authorEmail, authorUserName, title, description, imageID }) => (dispatch, getState) => {

	// request body
	const body = JSON.stringify({ author, authorEmail, authorUserName, title, description, imageID });

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

		axios
		.get('/api/posts/story/' + _id, config)
		.then(res =>
			dispatch({
				type: GET_STORY,
				payload: res.data
			})
		)
	}

//create a new variant of getPosts 
export const getPosts = ({ username }) => ( dispatch ) => {

	dispatch(setItemsLoading());

	// Headers
	const config = {
		headers: {
			"Content-type": "application/json"
		}
	}

	const body = JSON.stringify({ username });

	axios
		.post('/api/posts', body, config)
		.then(res =>
			dispatch({
				type: GET_ITEMS,
				payload: res.data
			})
		)
		.catch(err => {
			dispatch(returnErrors(err.response, err.response));
		});

	axios
		.post('/api/posts/similarPosts', body, config)
		.then(res =>
			dispatch({
				type: GET_SIMILAR_ITEMS,
				payload: res.data
			})
		)
		.catch(err => {
			dispatch(returnErrors(err.response, err.response));
		});

};

export const setItemsLoading = () => {
	return {
		type: ITEMS_LOADING
	}
};