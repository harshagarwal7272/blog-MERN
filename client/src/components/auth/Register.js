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
	NavLink,
	Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register, social_auth } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

class RegisterModal extends Component {
	state = {
		modal: false,
		name: '',
		email: '',
		password: '',
		msg: null
	};

	static propTypes = {
		isAuthenticated: PropTypes.bool,
		error: PropTypes.object.isRequired,
		register: PropTypes.func.isRequired,
		social_auth: PropTypes.func.isRequired,
		clearErrors: PropTypes.func.isRequired
	}

	componentDidUpdate(prevProps) {
		const { error, isAuthenticated } = this.props;
		if (error !== prevProps.error) {
			// check for register error
			if (error.id === 'REGISTER_FAIL') {
				this.setState({ msg: error.msg.msg });
			} else {
				this.setState({ msg: null });
			}
		}

		// if authenticated, close model
		if (this.state.modal) {
			if (isAuthenticated) {
				this.toggle();
			}
		}
	}

	responseGoogle = (response) => {
	    console.log("google console");
	    console.log(response.w3.ig);
	    console.log(response.w3.U3);

	    const name = response.w3.ig;
	    const email = response.w3.U3;

	    this.setState({
	    	name: name,
	    	email: email
	    });
	    const newUser = {
	    	name,
	    	email
	    };

	    // i am setting social user data
	    sessionStorage.setItem("socialUserData", JSON.stringify(newUser));

	    // Attempt to register
	    this.props.social_auth(newUser);
	}

	responseFacebook = (response) => {
		console.log("facebook console");
		console.log(response);
		const name = response.name;
		const email = response.email;

	    this.setState({
	    	name: name,
	    	email: email
	    });
	    const newUser = {
	    	name,
	    	email
	    };

	    // i am setting social user data
	    sessionStorage.setItem("socialUserData", JSON.stringify(newUser));

	    // Attempt to register
	    this.props.social_auth(newUser);

	}

	toggle = () => {
		//clear erros
		this.props.clearErrors();
		this.setState({
			modal: !this.state.modal
		});
	};

	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	onSubmit = e => {
		e.preventDefault();

		const { name, email, password } = this.state;

		//Create user object
		const newUser = {
			name,
			email,
			password
		};

		//Attempt to register
		this.props.register(newUser);
	}

	render() {
		return (
			<div>
				<NavLink onClick={this.toggle} href="#">
					Register
				</NavLink>

				<Modal
					isOpen={this.state.modal}
					toggle={this.toggle}
				>
					<ModalHeader toggle={this.toggle}>Register</ModalHeader>
					<ModalBody>
				{ this.state.msg ? <Alert color="danger">{ this.state.msg } </Alert> : null }
				<Form style={{paddingTop:'2rem'}} onSubmit={this.onSubmit}>
					<FormGroup>
						<Label for="name">Name</Label>
						<Input
							type="text"
							name="name"
							id="name"
							placeholder="Name"
							className="mb-3"
							onChange={this.onChange}
						/>

						<Label for="email">Email</Label>
						<Input
							type="email"
							name="email"
							id="email"
							placeholder="Email"
							className="mb-3"
							onChange={this.onChange}
						/>

						<Label for="password">Password</Label>
						<Input
							type="password"
							name="password"
							id="password"
							placeholder="Password"
							className="mb-3"
							onChange={this.onChange}
						/>

						<Button
							color="dark"
							style={{marginTop: '2rem'}}
							block
						>Register</Button>
					</FormGroup>
				</Form>
				<GoogleLogin
					clientId="1068239361892-dao96nieulbcm2otq3ihu1cfasfusc25.apps.googleusercontent.com"
					buttonText="SignUp with Google"
					onSuccess={this.responseGoogle}
					onFailure={this.responseGoogle}/>
				<FacebookLogin
					appId="1062401724117024"
					autoLoad={false}
					fields="name,email,picture"
					callback={this.responseFacebook}/>
				</ModalBody>
				</Modal>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated,
	error: state.error
});

export default connect(mapStateToProps, { register, social_auth, clearErrors })(RegisterModal);