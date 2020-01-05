import React, { Fragment, Component } from 'react';
import Register from './auth/Register';
import Login from './auth/Login';
import Logout from './auth/Logout';
import Post from './post/AddPhoto';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
	Container
} from 'reactstrap';

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
			<Fragment>
				<NavItem>
					<Post />
				</NavItem>
				<NavItem>
					<Logout />
				</NavItem>
			</Fragment>
		);

		const guestLinks = (
			<Fragment>
				<NavItem>
					<Register />
				</NavItem>
				<NavItem>
					<Login />
				</NavItem>
			</Fragment>
		);

		return (
			<Navbar color="dark" dark expand="sm" className="mb-5">
				<Container>
					<NavbarBrand href="/">Blog</NavbarBrand>
					<NavbarToggler onClick={this.toggle} />
					<Collapse isOpen={this.state.isOpen} navbar>
						<Nav className="ml-auto" navbar>
							{ isAuthenticated ? authLinks : guestLinks }
						</Nav>
					</Collapse>
				</Container>
			</Navbar>
		)
	}
}

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps, null)(Header);