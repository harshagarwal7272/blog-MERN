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
import { login, social_auth } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_ID;
const FACEBOOK_API_KEY = process.env.REACT_APP_FACEBOOK_API_ID;

class LoginModal extends Component {
	state = {
		modal: false,
		email: '',
		password: '',
		msg: null,
		thumbnail: null
	};

	static propTypes = {
		isAuthenticated: PropTypes.bool,
		error: PropTypes.object.isRequired,
		login: PropTypes.func.isRequired,
		clearErrors: PropTypes.func.isRequired
	}

	componentDidUpdate(prevProps) {
		const { error, isAuthenticated } = this.props;
		if (error !== prevProps.error) {
			// check for login error
			if (error.id === 'LOGIN_FAIL') {
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

	    console.log(response);

	    if (response.error === "popup_closed_by_user") {
	        return;
	    }

	    const name = response.profileObj.name;
	    const email = response.profileObj.email;
	    const thumbnail = response.profileObj.imageUrl;

	    this.setState({
	    	name: name,
	    	email: email,
	    	thumbnail: thumbnail
	    });
	    const newUser = {
	    	name,
	    	email,
	    	thumbnail
	    };

	    // Attempt to register
	    this.props.social_auth(newUser);
	}

	responseFacebook = (response) => {
		console.log("facebook console");

		if (response.status === "unknown") {
		    return;
		}

        const name = response.name;
        const email = response.email;
        const thumbnail = response.picture.data.url;

        this.setState({
            name: name,
            email: email,
            thumbnail: thumbnail
        });
        const newUser = {
            name,
            email,
            thumbnail
        };
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

		const { email, password } = this.state;

		const user = {
			email,
			password
		}

		//Attempt to login
		this.props.login(user);

	}

	render() {
		return (
			<div>
				<NavLink onClick={this.toggle} href="#">
					Login
				</NavLink>

				<Modal
					isOpen={this.state.modal}
					toggle={this.toggle}
				>
					<ModalHeader toggle={this.toggle}>Login</ModalHeader>
					<ModalBody>
				{ this.state.msg ? <Alert color="danger">{ this.state.msg } </Alert> : null }
				<Form onSubmit={this.onSubmit}>
					<FormGroup>
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
						>Login</Button>
					</FormGroup>
				</Form>
				<GoogleLogin
					clientId={GOOGLE_API_KEY}
					buttonText="SignIn with Google"
					onSuccess={this.responseGoogle}
					onFailure={this.responseGoogle}/>
				<FacebookLogin
					appId={FACEBOOK_API_KEY}
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

export default connect(mapStateToProps, { login, social_auth, clearErrors })(LoginModal);