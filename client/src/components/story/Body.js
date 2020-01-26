import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { getStory } from '../../actions/postActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PostTemplate from './PostTemplate';
import { FacebookShareButton } from 'react-share';
import axios from "axios";
import {GET_STORY, POST_SUCCESS} from "../../actions/types";
import {returnErrors} from "../../actions/errorActions";

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
						<p>
							Talk
						</p>
						<ul>
							<li>
								<span className="clap_count">{(story)?story[0].clap_count:0}</span><br/>
							<p className="clapper" onClick={this.clapFunc}>
    							<svg className="svgIcon-use" width="29" height="29" viewBox="0 0 29 29"><path d="M13.74 1l.76 2.97.76-2.97zM16.82 4.78l1.84-2.56-1.43-.47zM10.38 2.22l1.84 2.56-.41-3.03zM22.38 22.62a5.11 5.11 0 0 1-3.16 1.61l.49-.45c2.88-2.89 3.45-5.98 1.69-9.21l-1.1-1.94-.96-2.02c-.31-.67-.23-1.18.25-1.55a.84.84 0 0 1 .66-.16c.34.05.66.28.88.6l2.85 5.02c1.18 1.97 1.38 5.12-1.6 8.1M9.1 22.1l-5.02-5.02a1 1 0 0 1 .7-1.7 1 1 0 0 1 .72.3l2.6 2.6a.44.44 0 0 0 .63-.62L6.1 15.04l-1.75-1.75a1 1 0 1 1 1.41-1.41l4.15 4.15a.44.44 0 0 0 .63 0 .44.44 0 0 0 0-.62L6.4 11.26l-1.18-1.18a1 1 0 0 1 0-1.4 1.02 1.02 0 0 1 1.41 0l1.18 1.16L11.96 14a.44.44 0 0 0 .62 0 .44.44 0 0 0 0-.63L8.43 9.22a.99.99 0 0 1-.3-.7.99.99 0 0 1 .3-.7 1 1 0 0 1 1.41 0l7 6.98a.44.44 0 0 0 .7-.5l-1.35-2.85c-.31-.68-.23-1.19.25-1.56a.85.85 0 0 1 .66-.16c.34.06.66.28.88.6L20.63 15c1.57 2.88 1.07 5.54-1.55 8.16a5.62 5.62 0 0 1-5.06 1.65 9.35 9.35 0 0 1-4.93-2.72zM13 6.98l2.56 2.56c-.5.6-.56 1.41-.15 2.28l.26.56-4.25-4.25a.98.98 0 0 1-.12-.45 1 1 0 0 1 .29-.7 1.02 1.02 0 0 1 1.41 0zm8.89 2.06c-.38-.56-.9-.92-1.49-1.01a1.74 1.74 0 0 0-1.34.33c-.38.29-.61.65-.71 1.06a2.1 2.1 0 0 0-1.1-.56 1.78 1.78 0 0 0-.99.13l-2.64-2.64a1.88 1.88 0 0 0-2.65 0 1.86 1.86 0 0 0-.48.85 1.89 1.89 0 0 0-2.67-.01 1.87 1.87 0 0 0-.5.9c-.76-.75-2-.75-2.7-.04a1.88 1.88 0 0 0 0 2.66c-.3.12-.61.29-.87.55a1.88 1.88 0 0 0 0 2.66l.62.62a1.88 1.88 0 0 0-.9 3.16l5.01 5.02c1.6 1.6 3.52 2.64 5.4 2.96a7.16 7.16 0 0 0 1.18.1c1.03 0 2-.25 2.9-.7A5.9 5.9 0 0 0 23 23.24c3.34-3.34 3.08-6.93 1.74-9.17l-2.87-5.04z"></path></svg>
							</p>
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