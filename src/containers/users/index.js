import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import {
	addUsersAction,
	deleteUsersAction,
	fetchUsersAction,
	searchUsers
} from '../../actions/users';
import UserComponent from '../../components/main/users';
import AlertDialog from '../../components/reusable/alert';
import { API } from '../../constants';
import constituencyStyles from '../../static/styles/constituencyStyles';
import { capitalizeWord, formatUrl } from '../../utils';
import { validatePassword, validatePhoneNumber, validateUsername } from '../../utils/validators';

class User extends React.Component {
	
	validators = {
		validateUsername,
		validatePassword,
		validateContact: validatePhoneNumber
	};
	
	constructor(props) {
		super(props);
		this.state = {
			userId: '',
			username: '',
			contact: '',
			password: '',
			isSuperUser: false,
			isAdmin: false,
			showPassword: false,
			errors: {
				userId: '',
				username: '',
				contact: '',
				password: ''
			},
			alert: {
				message: '',
				title: ''
			},
			shouldOpenAlert: false,
			deleteId: '',
			switchToggle: {
				checked: false,
				value: false,
				label: 'Editing mode is disabled'
			}
		};
	}
	
	componentWillMount() {
		const { dispatch } = this.props;
		dispatch(fetchUsersAction());
	}

	onSubmit = (event) => {
		event.preventDefault();
		const { dispatch } = this.props;
		const {
			username, contact, password, userId, isSuperUser, isAdmin, switchToggle: { checked }
		} = this.state;
		
		if (checked && !userId) {
			this.setState({
				shouldOpenAlert: true,
				alert: {
					message: 'To create a new User, you must disable editing first.',
					title: 'Adding a new record'
				}
			});
			return;
		}
		const URL = checked
			? formatUrl(API.PUT_DELETE_GET_USERS_URL, [userId])
			: API.POST_GET_USERS_URL;
		
		const METHOD = checked ? 'PUT' : 'POST';
		const data = {
			username, contact, password, isSuperUser, isAdmin
		};
		
		if (!this.formHasError()) {
			dispatch(addUsersAction(data, URL, METHOD));
			this.setState({
				userId: '', username: '', contact: '', password: '', isSuperUser: false, isAdmin: false
			});
		}
	};
	
	onChange = name => (event) => {
		const { value } = event.target;
		const validate = value !== 'isAdmin' && value !== 'isSuperUser';
		this.setState(prevState => ({
			[name]: validate ? value : !prevState[name],
			errors: {
				...prevState.errors,
				[name]: validate ? this.validators[`validate${capitalizeWord(name)}`](value) : ''
			}
		}));
	};
	
	handleSwitch = (event) => {
		const record = { ...this.state };
		
		if (!event.target.checked) {
			record.userId = null;
			record.contact = '';
			record.username = '';
			record.password = '';
			record.isAdmin = false;
			record.isSuperUser = false;
		}
		this.setState({
			...record,
			switchToggle: {
				checked: event.target.checked,
				value: event.target.checked,
				label: event.target.checked
					? 'Your are in editing mode'
					: 'Editing mode is disabled'
			}
		});
	};
	
	formHasError = () => {
		const {
			username, contact, password, userId
		} = this.state;
		return !!(
			this.validators.validateUsername(username) ||
			this.validators.validateContact(contact) ||
			(userId ? false : this.validators.validatePassword(password))
		);
	};
	
	onClickDelete = value => (event) => {
		event.preventDefault();
		this.setState({
			alert: {
				message: 'Are you sure you want to delete this Record?',
				title: 'Delete Users'
			},
			shouldOpenAlert: true,
			deleteId: value
		});
	};
	
	onAcceptClickDelete = value => () => {
		const { dispatch } = this.props;
		this.setState({ shouldOpenAlert: false, deleteId: undefined });
		
		if (!value) return;
		dispatch(
			deleteUsersAction(formatUrl(API.PUT_DELETE_GET_USERS_URL, [value]))
		);
	};
	
	onDeclineClickDelete = () => {
		this.setState({ shouldOpenAlert: false });
	};
	
	onClickEdit = value => (event) => {
		event.preventDefault();
		const { switchToggle: { checked } } = this.state;
		if (checked) {
			this.setState({
				userId: value.id,
				username: value.username,
				contact: value.contact,
				isAdmin: value.isAdmin,
				isSuperUser: value.isSuperUser,
				password: ''
			});
		}
	};
	
	onSearch = (value) => {
		const { dispatch } = this.props;
		dispatch(searchUsers(value));
	};
	
	handleClickShowPassword = () => {
		this.setState(state => ({ showPassword: !state.showPassword }));
	};
	
	render() {
		const { classes, users } = this.props;
		const {
			errors, username, contact, password, isSuperUser, isAdmin,
			switchToggle, shouldOpenAlert, deleteId, alert, showPassword
		} = this.state;
		
		const headers = ['User Name ', 'Contact', 'Is Super User', 'Is Admin'];
		
		const body = users.map((record) => {
			const superUser = record.isSuperUser ? 'Yes' : 'No';
			const admin = record.isAdmin ? 'Yes' : 'No';
			return [record, record.id, record.username, record.contact, superUser, admin];
		});
		
		return (
			<Fragment>
				<AlertDialog
					open={shouldOpenAlert}
					message={alert.message}
					title={alert.title}
					onAccept={this.onAcceptClickDelete(deleteId)}
					onDecline={this.onDeclineClickDelete}
				/>
				<UserComponent
					showPassword={showPassword}
					username={username}
					contact={contact}
					password={password}
					isAdmin={isAdmin}
					isSuperUser={isSuperUser}
					classes={classes}
					errors={errors}
					switchToggle={switchToggle}
					tableBody={body}
					headers={headers}
					users={users}
					handleSwitch={this.handleSwitch}
					onSubmit={this.onSubmit}
					formHasError={this.formHasError}
					onChange={this.onChange}
					onClickDelete={this.onClickDelete}
					onClickEdit={this.onClickEdit}
					onSearch={this.onSearch}
					handleClickShowPassword={this.handleClickShowPassword}
				/>
			</Fragment>
		);
	}
}

User.propTypes = {
	classes: PropTypes.shape().isRequired,
	users: PropTypes.arrayOf(PropTypes.shape()),
	dispatch: PropTypes.func.isRequired
};

User.defaultProps = {
	users: []
};

const mapStateToProps = ({ userReducer }) => ({
	users: userReducer.users
});

export default connect(mapStateToProps)(withStyles(constituencyStyles)(User));
