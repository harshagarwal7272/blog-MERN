import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/postActions';
import PropTypes from 'prop-types';
import PostTemplate from './PostTemplate';

class Body extends Component {

	componentDidMount() {
		console.log("hihi " + this.props.userEmail);
		const email = {
			userEmail: this.props.userEmail
		}
		this.props.getPosts(email);
	}

	render() {

		const { authorData, authorExists } = this.props.auth;
		console.log("authorData is (from body): " + authorData);

		console.log(authorExists);

		let userDoesNotExist = false;

		if (!authorData) {
			userDoesNotExist = false;
		}

		console.log("userDoesNotExist " + userDoesNotExist);

		const { isAuthenticated, user } = this.props.auth;

		const email = this.props.userEmail;
		console.log("hey " + email);

		const { posts } = this.props.post;
		console.log(posts);

		const userExists = (
			<Fragment>
				<div className="graybg authorpage">
					<PostTemplate />
				</div>

				<div className="container margtop3rem">
				<a className="twitter-grid" href="https://twitter.com/TwitterDev/timelines/539487832448843776">WowThemesNet Tweets</a> <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
				</div>
			</Fragment>
		);

		return (
			<div>
				{ authorExists ? userExists : '' }
			</div>
			)
	}
}

Body.propTypes = {
	getPosts: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
	post: state.post,
	auth: state.auth
});

export default connect(
	mapStateToProps,
	{ getPosts }
)(Body);