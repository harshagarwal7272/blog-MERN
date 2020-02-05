import React, { Component } from 'react';
import Register from './auth/Register';
import Login from './auth/Login';
import Logout from './auth/Logout';
import Post from './post/AddPost';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {

	state = {
		isOpen: false
	}
	toggle = () => {
		this.setState({
			isOpen: !this.state.isOpen
		});
	}

	static propTypes = {
		auth: PropTypes.object.isRequired
	}

	render() {

		const { isAuthenticated, user } = this.props.auth;

		const authLinks = (
			<ul className="navbar-nav ml-auto">
				<li className="nav-item">
				<a className="nav-link" href={"/profile"}>Author<span className="sr-only"></span></a>
				</li>
				<li className="nav-item">
					<Post />
				</li>
				<li className="nav-item">
					<Logout />
				</li>
			</ul>
		);

		const guestLinks = (
			<ul className="navbar-nav ml-auto">
				<li className="nav-item">
					<Register />
				</li>
				<li className="nav-item">
					<Login />
				</li>
			</ul>
		);

		return (
			<nav className="navbar navbar-toggleable-md navbar-light bg-white fixed-top mediumnavigation">
				<button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
				<span className="navbar-toggler-icon"></span>
				</button>
				<div className="container" id="">
					<a className="navbar-brand" href="/">
					<img src="assets/img/logo.png" alt="logo" />
					</a>
					<div className="collapse navbar-collapse" id="navbarsExampleDefault">
						{ isAuthenticated ? authLinks : guestLinks }						
					</div>
				</div>
			</nav>
		)
	}
}

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps, null)(Header);