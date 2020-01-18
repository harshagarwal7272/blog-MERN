import React, { Component } from 'react';
import { getStory } from '../../actions/postActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PostTemplate from './PostTemplate';

class Body extends Component {

	componentDidMount() {
		const storyID = this.props.storyID;
		this.props.getStory(storyID);
	}

	render() {
		const story = this.props.story;

		return (
			<div>
<div className="container">
	<div className="row">
		<div className="col-md-2 col-xs-12">
			<div className="share">
				<p>
					Share
				</p>
				<ul>
					<li>
					<a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=http%3A//www.wowthemes.net">
					<svg className="svgIcon-use" width="29" height="29" viewBox="0 0 29 29"><path d="M16.39 23.61v-5.808h1.846a.55.55 0 0 0 .546-.48l.36-2.797a.551.551 0 0 0-.547-.62H16.39V12.67c0-.67.12-.813.828-.813h1.474a.55.55 0 0 0 .55-.55V8.803a.55.55 0 0 0-.477-.545c-.436-.06-1.36-.116-2.22-.116-2.5 0-4.13 1.62-4.13 4.248v1.513H10.56a.551.551 0 0 0-.55.55v2.797c0 .304.248.55.55.55h1.855v5.76c-4.172-.96-7.215-4.7-7.215-9.1 0-5.17 4.17-9.36 9.31-9.36 5.14 0 9.31 4.19 9.31 9.36 0 4.48-3.155 8.27-7.43 9.15M14.51 4C8.76 4 4.1 8.684 4.1 14.46c0 5.162 3.75 9.523 8.778 10.32a.55.55 0 0 0 .637-.543v-6.985a.551.551 0 0 0-.55-.55H11.11v-1.697h1.855a.55.55 0 0 0 .55-.55v-2.063c0-2.02 1.136-3.148 3.03-3.148.567 0 1.156.027 1.597.06v1.453h-.924c-1.363 0-1.93.675-1.93 1.912v1.78c0 .3.247.55.55.55h2.132l-.218 1.69H15.84c-.305 0-.55.24-.55.55v7.02c0 .33.293.59.623.54 5.135-.7 9.007-5.11 9.007-10.36C24.92 8.68 20.26 4 14.51 4"></path></svg>
					</a>
					</li>
				</ul>
				<div className="sep">
				</div>
				<p>
					Talk
				</p>
				<ul>
					<li>
					<a href="#comments">
					42<br/>
					<svg className="svgIcon-use" width="29" height="29" viewBox="0 0 29 29"><path d="M21.27 20.058c1.89-1.826 2.754-4.17 2.754-6.674C24.024 8.21 19.67 4 14.1 4 8.53 4 4 8.21 4 13.384c0 5.175 4.53 9.385 10.1 9.385 1.007 0 2-.14 2.95-.41.285.25.592.49.918.7 1.306.87 2.716 1.31 4.19 1.31.276-.01.494-.14.6-.36a.625.625 0 0 0-.052-.65c-.61-.84-1.042-1.71-1.282-2.58a5.417 5.417 0 0 1-.154-.75zm-3.85 1.324l-.083-.28-.388.12a9.72 9.72 0 0 1-2.85.424c-4.96 0-8.99-3.706-8.99-8.262 0-4.556 4.03-8.263 8.99-8.263 4.95 0 8.77 3.71 8.77 8.27 0 2.25-.75 4.35-2.5 5.92l-.24.21v.32c0 .07 0 .19.02.37.03.29.1.6.19.92.19.7.49 1.4.89 2.08-.93-.14-1.83-.49-2.67-1.06-.34-.22-.88-.48-1.16-.74z"></path></svg>
					</a>
					</li>
				</ul>
			</div>
		</div>
		<PostTemplate />
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

});

export default connect(
	mapStateToProps,
	{ getStory }
)(Body);