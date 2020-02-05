import React, { Component } from 'react';
import { getStory } from '../../actions/postActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PostTemplate from './PostTemplate';
import { FacebookShareButton } from 'react-share';
import axios from "axios";
import Clap from "./Clap";

let clapCount = 0;

class Body extends Component {

	componentDidMount() {
		const storyID = this.props.storyID;
		const id = {
			_id: storyID
		}
		this.props.getStory(id);
	}

	static propTypes = {
		auth: PropTypes.object.isRequired,
		post: PropTypes.object.isRequired
	}

	clapFunc = () => {
		const { story } = this.props.post;
		let { user } = this.props.auth;

		let story_id = "";
		let user_email = "";

		if(story){
			story_id = story[0]._id;
		}
		if(user){
			user_email = user.email;
		}
		if(story && user){

			this.clapCount = clapCount + 1;
			// request body
			const body = JSON.stringify({ story_id, user_email});
			// Headers
			const config = {
				headers: {
					"Content-type": "application/json"
				}
			}
			axios
				.post('/api/clap', body, config)
				.then(res => {
					console.log(res)

					// dispatch({
					// 	type: POST_SUCCESS,
					// 	payload: res.data
					// })
				})
				.catch(err => {
					console.log(err);
					// dispatch(
					// 	returnErrors(err.response, err.response)
					// );
				});

		}
	};

	render() {
		const { story } = this.props.post;
		const { user } = this.props.auth;
		return (
			<div>
				<div className="container">
					<div className="row">
						<div className="col-md-2 col-xs-12">
							<div className="share">
								<ul>
									<li>
										<FacebookShareButton
											url={"www.google.com"}
											quote={"Check this out!!!"}
										><svg className="svgIcon-use" width="29" height="29" viewBox="0 0 29 29"><path d="M16.39 23.61v-5.808h1.846a.55.55 0 0 0 .546-.48l.36-2.797a.551.551 0 0 0-.547-.62H16.39V12.67c0-.67.12-.813.828-.813h1.474a.55.55 0 0 0 .55-.55V8.803a.55.55 0 0 0-.477-.545c-.436-.06-1.36-.116-2.22-.116-2.5 0-4.13 1.62-4.13 4.248v1.513H10.56a.551.551 0 0 0-.55.55v2.797c0 .304.248.55.55.55h1.855v5.76c-4.172-.96-7.215-4.7-7.215-9.1 0-5.17 4.17-9.36 9.31-9.36 5.14 0 9.31 4.19 9.31 9.36 0 4.48-3.155 8.27-7.43 9.15M14.51 4C8.76 4 4.1 8.684 4.1 14.46c0 5.162 3.75 9.523 8.778 10.32a.55.55 0 0 0 .637-.543v-6.985a.551.551 0 0 0-.55-.55H11.11v-1.697h1.855a.55.55 0 0 0 .55-.55v-2.063c0-2.02 1.136-3.148 3.03-3.148.567 0 1.156.027 1.597.06v1.453h-.924c-1.363 0-1.93.675-1.93 1.912v1.78c0 .3.247.55.55.55h2.132l-.218 1.69H15.84c-.305 0-.55.24-.55.55v7.02c0 .33.293.59.623.54 5.135-.7 9.007-5.11 9.007-10.36C24.92 8.68 20.26 4 14.51 4"></path></svg>
										</FacebookShareButton>
									</li>
								</ul>
							<div className="sep">
						</div>
						<ul>
							<li>
							    <Clap />
							</li>
						</ul>
					</div>
				</div>
				<PostTemplate storyDetails={(story)?story[0]:undefined}/>
			</div>
				</div>

				<div className="hideshare"></div>

				<div className="container margtop3rem">
					<a className="twitter-grid" href="https://twitter.com/TwitterDev/timelines/539487832448843776">WowThemesNet Tweets</a> <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
				</div>
				<div className="alertbar">
					<div className="container text-center">
						<img src="assets/img/logo.png" alt="" /> &nbsp; Never miss a <b>story</b> from us, get weekly updates in your inbox. <a href="#" className="btn subscribe">Get Updates</a>
					</div>
				</div>
			</div>
		);
	}
}

Body.propTypes = {
	getStory: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
	post: state.post,
	auth: state.auth
});

export default connect(
	mapStateToProps,
	{ getStory }
)(Body);