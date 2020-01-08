import React, { Component } from 'react';
import PostTemplate from './PostTemplate';

class Body extends Component {
	render() {
		return (
			<div>
				<section className="featured-posts">
				<div className="section-title">
					<h2><span>All stories</span></h2>
				</div>
				<div className="card-columns listfeaturedtag">
					<PostTemplate />
				</div>
				</section>
			</div>
		)
	}
}

export default Body;