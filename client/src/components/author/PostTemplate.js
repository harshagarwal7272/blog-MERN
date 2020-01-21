import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/postActions';
import PropTypes from 'prop-types';
import {
	ListGroup,
	ListGroupItem
} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';


class PostTemplate extends Component {
	render() {
		const { posts } = this.props.post;

		return (
			<div className="container">
				<ListGroup>
					<TransitionGroup className="listrecent listrelated">
					{posts.map(({ _id, author, authorEmail, title, description, read_duration, date, imageData }) => (
						<CSSTransition key={_id} timeout={0}>
							<ListGroupItem>
								<div className="authorpostbox">
									<div className="card">
										<a href={ "/author/" + authorEmail }>
											<img className="img-fluid img-thumb" src={"./../../uploads/" + imageData.substring(8,imageData.length)} alt="" />
										</a>
											<div className="card-block">
												<h2 className="card-title"><a href={ "/story/" + _id }> { title } </a></h2>
												<h4 className="card-text"> { description } </h4>
												<div className="metafooter">
													<div className="wrapfooter">
													<span className="meta-footer-thumb">
													<a href={ "/author/" + authorEmail }><img className="author-thumb" src="https://www.gravatar.com/avatar/e56154546cf4be74e393c62d1ae9f9d4?s=250&amp;d=mm&amp;r=x" alt="Sal" /></a>
													</span>
													<span className="author-meta">
													<span className="post-name"><a href="author.html">{ author }</a></span><br/>
													<span className="post-date">{ date.substring(0,10) }</span><span className="dot"></span><span className="post-read">{ read_duration } min read</span>
													</span>
													<span className="post-read-more"><a href={ "/story/" + _id } title="Read Story"><svg className="svgIcon-use" width="25" height="25" viewBox="0 0 25 25"><path d="M19 6c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v14.66h.012c.01.103.045.204.12.285a.5.5 0 0 0 .706.03L12.5 16.85l5.662 4.126a.508.508 0 0 0 .708-.03.5.5 0 0 0 .118-.285H19V6zm-6.838 9.97L7 19.636V6c0-.55.45-1 1-1h9c.55 0 1 .45 1 1v13.637l-5.162-3.668a.49.49 0 0 0-.676 0z" fillRule="evenodd"></path></svg></a></span>
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
			</div>
		);
	}
}

PostTemplate.propTypes = {
	getPosts: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
	post: state.post,
	auth: state.auth
});

export default connect(
	mapStateToProps,
	{ getPosts }
)(PostTemplate);