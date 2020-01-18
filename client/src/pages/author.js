import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Title from '../components/author/Title';
import Body from '../components/author/Body';

// redirect to author page on clicking here.
class Author extends Component {
	render() {

		// get the email for identifying the unique author
		const { email } = this.props.match.params;
		
		return (
			<div>
				<Header />
					<div className="container">
						<Title userEmail={email} />
						<Body userEmail={email} />
					</div>
				<Footer />
			</div>
		);
	}
}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, null)(Author);