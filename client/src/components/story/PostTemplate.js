import React, { Component } from 'react';
import Title from './Title';

class PostTemplate extends Component {
	render() {
		const story = this.props.storyDetails;

		let storyDetails = {};
		if(story){
			storyDetails.title = story.title;
			storyDetails.description = story.description;
			storyDetails.imageData = story.imageData.substring(8,story.imageData.length);  //as imageData comes in the form "uploads/img.jpg"

		} else {
			storyDetails.title = "";
			storyDetails.description = "";
			storyDetails.imageData = "";
		}

		return (
			<div className="col-md-8 col-md-offset-2 col-xs-12">
			<div className="mainheading">
				<Title />
				<h1 className="posttitle">{storyDetails.title}</h1>
			</div>
			<img className="featured-image img-fluid" src={"./../../uploads/" + storyDetails.imageData } alt="" />
			<div className="article-post">
				<p>{storyDetails.description}</p>
			</div>
		</div>
		);
	}
}

export default PostTemplate;