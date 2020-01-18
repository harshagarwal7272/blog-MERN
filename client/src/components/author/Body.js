import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/postActions';
import PropTypes from 'prop-types';
import PostTemplate from './PostTemplate';

class Body extends Component {

	componentDidMount() {
		const email = {
			userEmail: this.props.userEmail
		}
		this.props.getPosts(email);
	}

	render() {
		const { authorData } = this.props.auth;

		let userDoesNotExist = true;

		if (authorData && authorData[0] && authorData[0].email) {
			userDoesNotExist = false;
		}

		const email = this.props.userEmail;

		const userExists = (
			<Fragment>
				<div className="graybg authorpage">
					<PostTemplate userEmail={this.props.userEmail} />
				</div>
				<div className="container margtop3rem">
				<a className="twitter-grid" href="https://twitter.com/TwitterDev/timelines/539487832448843776">WowThemesNet Tweets</a> <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
				</div>
			</Fragment>
		);

		return (
			<div>
				{ userDoesNotExist ? '' : userExists }
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