import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/postActions';
import PropTypes from 'prop-types';
import Truncate from 'react-truncate';
import {
	Container,
	ListGroup,
	ListGroupItem
} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

class PostTemplate extends Component {

	componentDidMount() {
		this.props.getPosts();
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
															<Truncate lines={3}>
																{ description }
															</Truncate>
														</h4>
														<div className="metafooter">
															<div className="wrapfooter">
																<span className="author-meta">
																<span className="post-name"><a href="author.html">{ author }</a></span><br/>
																<span className="post-date">{ date.substring(0,10) }</span><span className="dot"></span><span className="post-read">{ read_duration } min read</span>
																</span>
																<span className="post-read-more"><a href="/readStory" title="Read Story"><svg className="svgIcon-use" width="25" height="25" viewBox="0 0 25 25"><path d="M19 6c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v14.66h.012c.01.103.045.204.12.285a.5.5 0 0 0 .706.03L12.5 16.85l5.662 4.126a.508.508 0 0 0 .708-.03.5.5 0 0 0 .118-.285H19V6zm-6.838 9.97L7 19.636V6c0-.55.45-1 1-1h9c.55 0 1 .45 1 1v13.637l-5.162-3.668a.49.49 0 0 0-.676 0z" fillRule="evenodd"></path></svg></a></span>
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
	post: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
	post: state.post
});

export default connect(
	mapStateToProps,
	{ getPosts }
)(PostTemplate);