import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import Register from './auth/Register';
import Login from './auth/Login';


class Entry extends Component {
	render() {
		return (
			<div>
				<div>
					Where BloggerS meet
				</div>
				<div>
		          	<ul>
			            <li><Link to={'/register'}>Register</Link></li>
			            <li><Link to={'/login'}>Login</Link></li>
			        </ul>
				</div>
			</div>
		)
	}
}

export default Entry;