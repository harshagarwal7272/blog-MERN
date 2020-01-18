import React, { Component } from 'react';
import Title from './Title';

class PostTemplate extends Component {
	render() {
		const { storyDetails } = this.props;
		return (
			<div className="col-md-8 col-md-offset-2 col-xs-12">
			<div className="mainheading">
				<Title />
				<h1 className="posttitle">{(storyDetails?storyDetails.title:"")}</h1>
			</div>
			<img className="featured-image img-fluid" src="assets/img/demopic/10.jpg" alt="" />
			<div className="article-post">
				<p>{(storyDetails?storyDetails.description:"")}</p>
			</div>
		</div>
		);
	}
}

export default PostTemplate;