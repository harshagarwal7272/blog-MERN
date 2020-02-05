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
import { updateProfile } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

class Body extends Component {
    state = {
		username: '',
		description: '',
		msg: null
	};

	static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        updateProfile: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const { user, isAuthenticated } = this.props.auth;

        if (isAuthenticated) {

            const email = user.email;

            const { username, description } = this.state;

            //Create user object
            const updateUser = {
                email,
                username,
                description
            };

            //Attempt to register
            this.props.updateProfile(updateUser);
        }
    }

    render() {
        return (
            <div>
                { this.state.msg ? <Alert color="danger">{ this.state.msg } </Alert> : null }
                <Form style={{paddingTop:'2rem'}} onSubmit={this.onSubmit}>
                    <FormGroup>
                        <Label for="username">Username</Label>
                        <Input
                            type="text"
                            name="username"
                            id="username"
                            placeholder="UserName"
                            className="mb-3"
                            onChange={this.onChange}
                        />
                        <Label for="description">Author Description</Label>
						<Input
							type="textarea"
							name="description"
							id="description"
							placeholder="Add Description"
							cols="50"
							rows="10"
							className="mb-3"
							onChange={this.onChange}
						/>
                        <Button
                            color="dark"
                            style={{marginTop: '2rem'}}
                            block
                        >Submit</Button>
                    </FormGroup>
                </Form>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
	error: state.error
});

export default connect(mapStateToProps, { updateProfile, clearErrors })(Body);