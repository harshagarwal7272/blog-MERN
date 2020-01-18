import React, { Fragment, Component } from 'react';
import { getAuthorDetails } from '../../actions/authActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// add className=disabled when user is not logged in, which will not allow the user to click until he logins

class Title extends Component {

	componentDidMount() {
		const { userEmail } = this.props;
		const email = {
			userEmail: userEmail
		}
		console.log("ku akfhadojfhkjad");
		this.props.getAuthorDetails(email);
	}

	render() {
		const { authorData, authorExists } = this.props.auth;
		console.log(authorData);

		let userDoesNotExist = true;

		if (typeof(authorData) === 'object') {
			console.log("in");
			userDoesNotExist = true;
		}

		console.log("userDoesNotExist " + userDoesNotExist);

		const { isAuthenticated, user } = this.props.auth;

		const userExists = (
			<Fragment>
				<div className="container">
					<div className="row">
						<div className="col-md-2"></div>
						<div className="col-md-8 col-md-offset-2">
							<div className="mainheading">
								<div className="row post-top-meta authorpage">
									<div className="col-md-10 col-xs-12">
										<h1>Pal</h1>
										<span className="author-description">Founder of <a target="_blank" href="https://www.wowthemes.net">WowThemes.net</a> and creator of <strong>"Mediumish"</strong> theme that you're currently previewing. I professionally develop premium themes, templates & scripts since the Apocalypse (2012). You can reach me out on the social links below.</span>
										<div className="sociallinks"><a  target="_blank" href="https://www.facebook.com/wowthemesnet/"><i className="fa fa-facebook"></i></a> <span className="dot"></span> <a target="_blank" href="https://plus.google.com/s/wowthemesnet/top"><i className="fa fa-google-plus"></i></a></div>
										<a target="_blank" href="https://twitter.com/wowthemesnet" className="btn follow">Follow</a>
									</div>
									<div className="col-md-2 col-xs-12">
										<img className="author-thumb" src="https://www.gravatar.com/avatar/e56154546cf4be74e393c62d1ae9f9d4?s=250&amp;d=mm&amp;r=x" alt="Sal" />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Fragment>
		);

		const userNotExists = (
			<Fragment>
				<h1>No such USER exists.</h1>
			</Fragment>
		);

		return (
			<div>
				{ authorExists ? userExists : userNotExists }
			</div>
		)
	}
}

Title.propTypes = {
	getAuthorDetails: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
}


const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(
	mapStateToProps, 
	{ getAuthorDetails }
)(Title);