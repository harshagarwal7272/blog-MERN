import axios from 'axios';

import { returnErrors } from './errorActions';

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
	UPDATE_SUCCESS,
	UPDATE_FAIL
} from './types';

// Check token and load user
export const loadUser = () => (dispatch, getState) => {
	// User loading
	dispatch({ type: USER_LOADING });

	let userData = JSON.parse(sessionStorage.getItem('socialUserData'));
	if (userData) {
		dispatch({
			type: USER_LOADED,
			payload: userData
		})
	} else {
		axios.get('/api/auth/user', tokenConfig(getState))
			.then(res => dispatch({
				type: USER_LOADED,
				payload: res.data
			}))
			.catch(err => {
				dispatch(returnErrors(err.response.data, err.response.status));
				dispatch({ type: AUTH_ERROR });
			});
		}
};

//Register User
export const register = ({ name, email, password }) => dispatch => {
	// Headers
	const config = {
		headers: {
			'Content-type': 'application/json'
		}
	};
	const body = JSON.stringify({ name, email, password });

	axios.post('/api/users', body, config)
		.then(res => dispatch({
			type: REGISTER_SUCCESS,
			payload: res.data
		}))
		.catch(err => {
			dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
			dispatch({
				type: REGISTER_FAIL
			});
		});
};

// Login user for social auth
export const social_auth = ({ name, email, thumbnail }) => dispatch => {
	
	// Headers
	const config = {
		headers: {
			'Content-type': 'application/json'
		}
	};

	const body = JSON.stringify({ name, email, thumbnail });

	axios.post('/api/users/social', body, config)
		.then(res => dispatch({
		type: REGISTER_SUCCESS,
		payload: res.data
	}))
	.catch(err => {
		dispatch({
			type: REGISTER_FAIL
		});
	})
};

// Get author details
export const getAuthorDetails = ({ userEmail }) => dispatch => {
	// Headers
	const config = {
		headers: {
			'Content-type': 'application/json'
		}
	};

	const body = JSON.stringify({ userEmail });

	axios.get('/api/users/author/'+userEmail, body, config)
		.then(res => dispatch({
		type: GET_AUTHOR_SUCCESS,
		payload: res.data
	}))
	.catch(err => {
		dispatch({
			type: GET_AUTHOR_FAIL
		});
	})
};

// Follow a user
export const followUser = ({ userToFollow, userWhoFollow }) => dispatch => {

	const config = {
		headers: {
			'Content-type': 'application/json'
		}
	};

	const body = JSON.stringify({ userToFollow, userWhoFollow });

	axios.post('/api/users/follow', body, config)
		.then(() => {
			alert("User followed");
		})
		.catch(err => {
			alert("Error in following user");
		});
};

export const updateProfile = ({ email, username, description }) => dispatch => {
    const config = {
    		headers: {
    			'Content-type': 'application/json'
    		}
    };

    //request body
    const body = JSON.stringify({ email, username, description });

    axios
        .post('/api/users/updateProfile', body, config)
        .then(res =>
            dispatch({
                type: UPDATE_SUCCESS
            })
        )
        .catch(err => {
            dispatch({
                type: UPDATE_FAIL
            });
        });
};

//Login user
export const login = ({ email, password }) => dispatch => {
	const config = {
		headers: {
			'Content-type': 'application/json'
		}
	};

	// request body
	const body = JSON.stringify({ email, password });
	axios
		.post('/api/auth', body, config)
		.then(res =>
			dispatch({
				type: LOGIN_SUCCESS,
				payload: res.data
			})
		)
		.catch(err => {
			dispatch(
				returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL')
			);
			dispatch({
				type: LOGIN_FAIL
			});
		});
};

//Logout user
export const logout = () => {
	return {
		type: LOGOUT_SUCCESS
	};
};

// Setup config/headers and token
export const tokenConfig = (getState) => {
	// Get token from localstorage
	const token = getState().auth.token;

	// Headers
	const config = {
		headers: {
			"Content-type": "application/json"
		}
	}
	// If token, add to headers
	if (token) {
		config.headers['x-auth-token'] = token;
	}

	return config;
};