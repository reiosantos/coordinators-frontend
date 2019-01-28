import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { authAction } from '../../actions/auth';
import SignUpForm from '../../components/auth/signupForm';
import CircularIntegration from '../../components/progress';
import CustomizedSnackBar from '../../components/snackBar';
import { API } from '../../constants';
import { capitalizeWord, sleep } from '../../utils';
import { validatePassword, validatePhoneNumber, validateUsername } from '../../utils/validators';

class SignUp extends React.Component {

	validators = {
		validateUsername,
		validatePassword,
		validatePhoneNumber,
		validateFullNames: validateUsername
	};

	snack = {
		message: '',
		open: false,
		variant: 'info'
	};

	initialState = {
		isAdmin: false,
		isSuperUser: false,
		password: '',
		username: '',
		showPassword: false,
		errors: {
			username: '',
			password: '',
			representative: ''
		},
		loader: {
			success: false,
			loading: false
		}
	};

	constructor(props) {
		super(props);
		this.state = this.initialState;
	}

	componentWillReceiveProps(nextProps, nextState) {
		const { auth } = nextProps;
		const { error, success } = auth;

		if (error || success) {
			this.snack.message = error || success;
			this.snack.open = true;
			this.snack.variant = error ? 'error' : 'success';
			this.setState({ loader: { loading: false, success: true } });
		} else {
			this.snack.open = false;
		}

		if (success) {
			this.setState({ ...this.initialState });
			sleep(3000).then(this.redirect);
		}
	}

	redirect = () => {
		const { history } = this.props;
		history.push('/login');
	};

	onSubmit = (event) => {
		event.preventDefault();
		const { dispatch } = this.props;

		if (!this.formHasError()) {
			dispatch(authAction(this.state, API.SIGNUP_URL));
			this.setState({ loader: { loading: true } });
		}
	};

	handleSnackClose = (event, reason) => {
		this.snack.open = false;
		this.setState({});
	};

	formHasError = () => {
		const {
			username, password, phoneNumber, fullNames
		} = this.state;

		const { validateFullNames } = this.validators;

		return !!(
			validateFullNames(fullNames) ||
			validateUsername(username) ||
			validatePassword(password) ||
			validatePhoneNumber(phoneNumber)
		);
	};

	onChange = name => (event) => {
		const { value } = event.target;
		this.setState(prevState => ({
			[name]: value,
			errors: {
				...prevState.errors,
				[name]: this.validators[`validate${capitalizeWord(name)}`](value)
			}
		}));

	};

	handleSelectChange = name => (event) => {
		this.setState({ [name]: event.target.value });
	};

	handleClickShowPassword = () => {
		this.setState(state => ({ showPassword: !state.showPassword }));
	};

	render() {
		const { userType, loader } = this.state;
		const { open, message, variant } = this.snack;

		return (
			<Fragment>

				<CircularIntegration {...loader} />

				<CustomizedSnackBar
					variant={variant}
					open={open}
					handleClose={this.handleSnackClose}
					message={message}
				/>

				<SignUpForm
					onSubmit={this.onSubmit}
					onChange={this.onChange}
					selectValue={userType}
					formHasError={this.formHasError}
					handleSelectChange={this.handleSelectChange}
					{...this.state}
					handleClickShowPassword={this.handleClickShowPassword}
				/>
			</Fragment>
		);
	}
}

const mapStateToProps = state => ({ auth: state.authReducer });
const mapDispatchToProps = dispatch => ({ dispatch });

export { SignUp as SignUpTest };

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
