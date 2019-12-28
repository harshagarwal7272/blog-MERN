import React, { Component } from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';
import AuthorPosts from '../components/author/AuthorPosts';

class Author extends Component {
	render() {
		return (
			<div>
				<Header />
					<div className="container">
						<AuthorPosts />
					</div>
				<Footer />
			</div>
		)
	}
}

export default Author;