import React, { Component } from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Title from '../components/profile/Title';
import Body from '../components/profile/Body';

class Home extends Component {
	render() {
		return (
			<div>
				<Header />
					<div className="container">
						<Title />
						<Body />
					</div>
				<Footer />
			</div>
		)
	}
}

export default Home;