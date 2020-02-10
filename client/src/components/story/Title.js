import React, { Component } from 'react';
import { followUser } from '../../actions/authActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


class Title extends Component {

	componentDidMount() {
	}

	static propTypes = {
		auth: PropTypes.object.isRequired
	}

	userFollow = (userToFollow) => {
		const { user } = this.props.auth;
		const userWhoFollow = user.email;
		const userFollowDetails = {
			userToFollow: userToFollow,
			userWhoFollow: userWhoFollow
		}
		console.log(userFollowDetails);
		this.props.followUser(userFollowDetails);
	}
	
	render() {

		const { isAuthenticated, user } = this.props.auth;
		const { story } = this.props.post;

		let storyDetails = {};
		if(story){
			storyDetails = story[0];
			storyDetails.date = storyDetails.date.substring(0,10);
		} else {
			storyDetails.authorEmail = "";
			storyDetails.author = "";
			storyDetails.read_duration = "";
			storyDetails.date = "";
		}

		let follow = true;

		if (!isAuthenticated) {
			follow = false;
		} else {
			if (user.email === storyDetails.authorEmail) {
				follow = false;
			}
		}

		return (
			<div className="row post-top-meta">
				<div className="col-md-2">
					<a href={"/author/"+storyDetails.authorUserName}><img className="author-thumb" src="https://www.gravatar.com/avatar/e56154546cf4be74e393c62d1ae9f9d4?s=250&amp;d=mm&amp;r=x" alt="Sal" /></a>
				</div>
				<div className="col-md-10">
					<a className="link-dark" href={"/author/"+storyDetails.authorUserName}>{storyDetails.author}</a>
					<br/>
					{(follow?<button className="btn follow" onClick={() => this.userFollow(storyDetails.authorEmail)}>Follow</button>:"")}
					<br/>
					<span className="post-date">{storyDetails.date}</span><span className="dot"></span>
					<br/>
					<span className="post-read">{storyDetails.read_duration} min read</span>
				</div>
			</div>
		);
	}
}

Title.propTypes = {
	auth: PropTypes.object.isRequired
}


const mapStateToProps = (state) => ({
	post: state.post,
	auth: state.auth
});

export default connect(
	mapStateToProps, 
	{ followUser }
)(Title);
