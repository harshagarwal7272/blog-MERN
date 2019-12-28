import React, { Component } from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Article from '../components/post/Article';

class Posts extends Component {
	render() {
		return (
			<div>
				<Header />
					<div className="container">
						<Article />
					</div>
				<Footer />
			</div>
		)
	}
}

export default Posts;