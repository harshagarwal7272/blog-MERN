import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPosts, getStory } from '../../actions/postActions';
import PropTypes from 'prop-types';
import Truncate from 'react-truncate';
import {
	Container,
	ListGroup,
	ListGroupItem
} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

class PostTemplate extends Component {

	state = {
		_id: ''
	}

	componentDidMount() {
		this.props.getPosts();
	}

	readStory = (e, _id) => {
		e.preventDefault();

		this.setState({
			_id: _id
		});


		sessionStorage.setItem("_id", JSON.stringify(_id));

		window.location = '/readStory';
	}

	render() {

		const { posts } = this.props.post;

		return (
				<Container>
					<ListGroup>
						<TransitionGroup className="">
							{posts.map(({ _id, author, title, description, read_duration, date, imageData }) => (
								<CSSTransition key={_id} timeout={0}>
									<ListGroupItem>
										<div className="card">
											<div className="row">
												<div className="col-md-5 wrapthumbnail">
														<div className="thumbnail" style={{backgroundImage:"url(./../../uploads/" + imageData.substring(8,imageData.length) + ")"}}>
														</div>
												</div>
												<div className="col-md-7">
													<div className="card-block">
														<h2 className="card-title">{ title }</h2>
														<h4 className="card-text">
																{ description }
														</h4>
														<div className="metafooter">
															<div className="wrapfooter">
																<span className="author-meta">
																<span className="post-name"><a href="author.html">{ author }</a></span><br/>
																<span className="post-date">{ date.substring(0,10) }</span><span className="dot"></span><span className="post-read">{ read_duration } min read</span>
																</span>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</ListGroupItem>
								</CSSTransition>				
							))}
						</TransitionGroup>
					</ListGroup>
				</Container>
		);
	}
}

PostTemplate.propTypes = {
	getPosts: PropTypes.func.isRequired,
	getStory: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
	post: state.post
});

export default connect(
	mapStateToProps,
	{ getPosts, getStory }
)(PostTemplate);