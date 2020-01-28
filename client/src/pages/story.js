import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getStory } from '../actions/postActions';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Body from '../components/story/Body';

class Story extends Component {

	render() {
			// get the ID for identifying the unique story
			const { id } = this.props.match.params;

		return (
			<div>
				<Header />
						<div className="container">
							<Body storyID={id} />
						</div>
				<Footer />
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	post: state.post
});

export default connect(
	mapStateToProps,
	{ getStory }
)(Story);