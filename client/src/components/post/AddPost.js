import React, { Component } from 'react';
import {
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	Form,
	FormGroup,
	Label,
	Input,
	NavLink
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addPost, getPosts } from '../../actions/postActions';
import { clearErrors } from '../../actions/errorActions';
import axios from 'axios';

class AddPost extends Component {

	state = {
		modal: false,
		title: '',
		description: '',
		msg: null,
		imageID: null
	}

	static propTypes = {
		auth: PropTypes.object.isRequired,
		addPost: PropTypes.func.isRequired,
		getPosts: PropTypes.func.isRequired
	}

	componentDidMount() {
		this.props.getPosts();
	}

	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	uploadImage = (e) => {
		e.preventDefault();

		const currentTime = Date.now();
		this.setState({
			imageID: currentTime + "_" + e.target.files[0].name
		});

		let imageFormObj = new FormData();
		imageFormObj.append("imageID", currentTime + "_" + e.target.files[0].name);
		imageFormObj.append("imageData", e.target.files[0]);

		axios.post('/image/uploadmulter', imageFormObj)
		.then((data) => {
		if (data.data.success) {
			alert("Image has been successfully uploaded.");
			}
		})
		.catch((err) => {
			alert("Error while uploading image.");
		});
	}

	onSubmit = e => {
		e.preventDefault();

		const { user, isAuthenticated } = this.props.auth;
		const author = user.name;
		const authorEmail = user.email;
		const { title, description, imageID } = this.state;

		//Create post object
		const newPost = {
			author,
			authorEmail,
			title,
			description,
			imageID
		};

		//Attempt to addPost
		this.props.addPost(newPost);

		// close modal
		this.toggle();
	}

	toggle = () => {
		//clear erros
		this.props.clearErrors();
		this.setState({
			modal: !this.state.modal
		});
	};

	// add required for other inputs
	render() {
		return (
			<div>
				<NavLink onClick={this.toggle} href="#">
					AddPost
				</NavLink>

				<Modal
					isOpen={this.state.modal}
					toggle={this.toggle}
				>
					<ModalHeader toggle={this.toggle}>Add Post</ModalHeader>
					<ModalBody>
				<Form onSubmit={this.onSubmit}>
					<FormGroup>
						<Label for="title">Title</Label>
						<Input
							type="text"
							name="title"
							id="title"
							placeholder="Add Title"
							className="mb-3"
							onChange={this.onChange}
							required
						/>
						<Label for="description">Description</Label>
						<Input
							type="textarea"
							name="description"
							id="description"
							placeholder="Add Description"
							cols="50"
							rows="10"
							className="mb-3"
							onChange={this.onChange}
							required
						/>
						<Input
							type="file"
							name="imageID"
							id="imageID"
							placeholder="Add Picture"
							className="mb-3"
							onChange={(e) => this.uploadImage(e)}
							required
						/>
						<Button
							color="dark"
							style={{marginTop: '2rem'}}
							block
						>Upload</Button>
					</FormGroup>
				</Form>
			</ModalBody>
				</Modal>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	auth: state.auth,
	error: state.error
});

export default connect(mapStateToProps, { addPost, getPosts, clearErrors })(AddPost);