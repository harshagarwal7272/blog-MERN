import React, { Component } from 'react';
import { getAuthorDetails } from '../../actions/authActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


class Title extends Component {

	comonentDidMount() {
		const { userEmail } = this.props;
		const email = {
			userEmail: userEmail
		}
		console.log("ku akfhadojfhkjad");
		this.props.getAuthorDetails(email);
	}

	static propTypes = {
		auth: PropTypes.object.isRequired
	}
	
	render() {

		const { isAuthenticated, user } = this.props.auth;
		const { story } = this.props.post;

		let storyDetails = undefined;
		if(story)
			storyDetails = story[0];



		return (
			<div className="row post-top-meta">
				<div className="col-md-2">
					<a href="author.html"><img className="author-thumb" src="https://www.gravatar.com/avatar/e56154546cf4be74e393c62d1ae9f9d4?s=250&amp;d=mm&amp;r=x" alt="Sal" /></a>
				</div>
				<div className="col-md-10">

					<a className="link-dark" href={"/author/"+(storyDetails?storyDetails.authorEmail:"")}>{(storyDetails?storyDetails.author:"")}</a>{(isAuthenticated?<a href="#" className="btn follow">Follow</a>:<a></a>)}
					<span className="author-description">Founder of WowThemes.net and creator of <b>"Mediumish"</b> theme that you're currently previewing. Developing professional premium themes, templates, plugins, scripts since 2012.</span>
					<span className="post-date">{(storyDetails?storyDetails.date.substring(0,10):"")}</span><span className="dot"></span><span className="post-read">{(storyDetails?storyDetails.read_duration:"")} min read</span>
				</div>
			</div>
		);
	}
}

Title.propTypes = {
	getAuthor: PropTypes.func.isRequired
}


const mapStateToProps = (state) => ({
	post: state.post,
	auth: state.auth
});

export default connect(
	mapStateToProps, 
	{ getAuthorDetails }
)(Title);
