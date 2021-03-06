import React, { Fragment, Component } from 'react';
import { getAuthorDetails, followUser } from '../../actions/authActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// add className=disabled when user is not logged in, which will not allow the user to click until he logins

class Title extends Component {

	componentDidMount() {
		const { username } = this.props;
		const userName = {
			username: username
		}
		this.props.getAuthorDetails(userName);
	}

	userFollow = () => {
		const userToFollow = this.props.username;
		const { user } = this.props.auth;
		const userWhoFollow = user.username;
		const userFollowDetails = {
			userToFollow: userToFollow,
			userWhoFollow: userWhoFollow
		}
		this.props.followUser(userFollowDetails);
	}

	render() {
		const { authorData } = this.props.auth;

		let userDoesNotExist = true;
		let authorName = '';
		let authorDesc = '';
		let authorImage = "https://www.gravatar.com/avatar/e56154546cf4be74e393c62d1ae9f9d4?s=250&amp;d=mm&amp;r=x";

		if (authorData && authorData[0] && authorData[0].email) {
			authorName = authorData[0].name;
			authorDesc = authorData[0].authorDesc;
			if (authorData[0].thumbnail) {
				authorImage = authorData[0].thumbnail;
			}
			userDoesNotExist = false;
		}


		const { isAuthenticated, user } = this.props.auth;

		let follow = true;

		if (!userDoesNotExist) {
			if (!isAuthenticated) {
				follow = false;
			} else {
				if (user.email === authorData[0].email) {
					follow = false;
				}
			}
		}

		const userExists = (
			<Fragment>
				<div className="container">
					<div className="row">
						<div className="col-md-2"></div>
						<div className="col-md-8 col-md-offset-2">
							<div className="mainheading">
								<div className="row post-top-meta authorpage">
									<div className="col-md-10 col-xs-12">
										<h1>{ authorName }</h1>
										<span className="author-description">{ authorDesc }</span>
										<div className="sociallinks"><a  target="_blank" href="https://www.facebook.com/wowthemesnet/"><i className="fa fa-facebook"></i></a> <span className="dot"></span> <a target="_blank" href="https://plus.google.com/s/wowthemesnet/top"><i className="fa fa-google-plus"></i></a></div>
										{
											follow ? <button className="btn follow" onClick={this.userFollow}>Follow</button> : ''
										}
									</div>
									<div className="col-md-2 col-xs-12">
										<img className="author-thumb" src={ authorImage } alt="Sal" />
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
				{ userDoesNotExist ? userNotExists : userExists }
			</div>
		)
	}
}

Title.propTypes = {
	getAuthorDetails: PropTypes.func.isRequired,
	followUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
}


const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(
	mapStateToProps, 
	{ getAuthorDetails, followUser }
)(Title);
