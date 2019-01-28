import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { authAction } from '../../actions/auth';
import LogInForm from '../../components/auth/loginForm';
import CircularIntegration from '../../components/progress';
import CustomizedSnackBar from '../../components/snackBar';
import { API } from '../../constants';
import { validateUsername } from '../../utils/validators';

class LogIn extends React.Component {

	snack = {
		message: '',
		open: false,
		variant: 'info'
	};

	initialState = {
		password: '',
		username: '',
		showPassword: false,
		errors: {
			username: '',
			password: ''
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
		const { error, success, user } = auth;

		if (error || success) {
			this.snack.message = Object.values(error).join(' <-> ') || success;
			this.snack.open = true;
			this.snack.variant = error ? 'error' : 'success';
			this.setState({ loader: { loading: false, success: true }, errors: error });
		} else {
			this.snack.open = false;
		}

		if (user && user.fullNames) {
			this.setState({ ...this.initialState });
			window.location.assign('/');
		}
	}

	onSubmit = (event) => {
		event.preventDefault();
		const { dispatch } = this.props;

		if (!this.formHasError()) {
			dispatch(authAction(this.state, API.LOGIN_URL));
			this.setState({ loader: { loading: true } });
		}
	};

	handleSnackClose = (event, reason) => {
		this.snack.open = false;
		this.setState({});
	};

	formHasError = () => {
		const {
			username
		} = this.state;

		return !!validateUsername(username);
	};

	onChange = name => (event) => {
		const { value } = event.target;
		this.setState(prevState => ({
			[name]: value,
			errors: {
				...prevState.errors,
				[name]: name === 'username' ? validateUsername(value) : ''
			}
		}));
	};

	handleClickShowPassword = () => {
		this.setState(state => ({ showPassword: !state.showPassword }));
	};

	render() {
		const { loader } = this.state;
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

				<LogInForm
					onSubmit={this.onSubmit}
					onChange={this.onChange}
					formHasError={this.formHasError}
					{...this.state}
					handleClickShowPassword={this.handleClickShowPassword}
				/>
			</Fragment>
		);
	}
}

const mapStateToProps = state => ({ auth: state.authReducer });
const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
