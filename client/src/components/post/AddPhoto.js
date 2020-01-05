import React, { Component, useState } from 'react';
import {
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	Form,
	FormGroup,
	Label,
	Input,
	NavLink,
	Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addPhoto } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';
import axios from 'axios';

class AddPhoto extends Component {

	state = {
		modal: false,
		title: '',
		description: '',
		msg: null,
		picture: null
	}

	static propTypes = {
		auth: PropTypes.object.isRequired,
		addPhoto: PropTypes.func.isRequired
	}

	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	uploadImage = (e) => {
		e.preventDefault();

		console.log(e.target.files[0]);

		const currentTime = Date.now();

		this.setState({
			picture: currentTime + "_" + e.target.files[0].name
		});

		let imageFormObj = new FormData();

		console.log(e.target);

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

		console.log(this.state.picture);

		const { user, isAuthenticated } = this.props.auth;
		const author = user.name;
		const { title, description, picture } = this.state;

		//Create post object
		const newPost = {
			author,
			title,
			description,
			picture
		};

		//Attempt to addPost
		this.props.addPhoto(newPost);

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
				{ this.state.msg ? <Alert color="danger">{ this.state.msg } </Alert> : null }
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
							name="picture"
							id="picture"
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

export default connect(mapStateToProps, { addPhoto, clearErrors })(AddPhoto);