import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import {
	addConstituencyAction,
	deleteConstituencyAction,
	fetchConstituencyAction, searchConstituencies
} from '../../actions/contituencies';
import { fetchRepresentativeAction } from '../../actions/representatives';
import AlertDialog from '../../components/alert';
import ConstituencyComponent from '../../components/constituency';
import { API } from '../../constants';
import constituencyStyles from '../../static/styles/constituencyStyles';
import { formatUrl } from '../../utils';
import { validateUsername } from '../../utils/validators';

class Constituency extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			constituencyId: '',
			representativeId: '',
			constituencyName: '',
			errors: {
				representativeId: '',
				constituencyName: ''
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
		dispatch(fetchConstituencyAction());
		dispatch(fetchRepresentativeAction());
	}

	onSubmit = (event) => {
		event.preventDefault();
		const { dispatch } = this.props;
		const {
			representativeId, constituencyName, constituencyId, switchToggle: { checked }
		} = this.state;
		
		if (checked && !constituencyId) {
			this.setState({
				shouldOpenAlert: true,
				alert: {
					message: 'To create a new constituency, you must disable editing first.',
					title: 'Adding a new record'
				}
			});
			return;
		}
		const URL = checked
			? formatUrl(API.PUT_DELETE_GET_CONSTITUENCIES_URL, [constituencyId])
			: API.POST_GET_CONSTITUENCIES_URL;
		
		const METHOD = checked ? 'PUT' : 'POST';
		const data = { representativeId: representativeId.trim() || undefined, constituencyName };
		
		if (!this.formHasError()) {
			dispatch(addConstituencyAction(data, URL, METHOD));
			this.setState({ representativeId: '', constituencyName: '', constituencyId: '' });
		}
	};
	
	onChange = name => (event) => {
		const { value } = event.target;
		this.setState(prevState => ({
			[name]: value,
			errors: {
				...prevState.errors,
				[name]: validateUsername(value)
			}
		}));
	};
	
	handleSelectChange = (event) => {
		const { value } = event.target;
		this.setState({ representativeId: value });
	};
	
	handleSwitch = name => (event) => {
		const constituency = { ...this.state };
		
		if (!event.target.checked) {
			constituency.representativeId = '';
			constituency.constituencyId = null;
			constituency.constituencyName = '';
		}
		this.setState({
			...constituency,
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
		const { constituencyName } = this.state;
		return !!validateUsername(constituencyName);
	};
	
	onClickDelete = value => (event) => {
		event.preventDefault();
		this.setState({
			alert: {
				message: 'Are you sure you want to delete this Record?',
				title: 'Delete Constituency'
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
			deleteConstituencyAction(
				formatUrl(API.PUT_DELETE_GET_CONSTITUENCIES_URL, [value])
			)
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
				constituencyId: value.id,
				representativeId: value.Representative ? value.Representative.id : '',
				constituencyName: value.constituencyName
			});
		}
	};
	
	onSearch = (value) => {
		const { dispatch } = this.props;
		dispatch(searchConstituencies(value));
	};
	
	render() {
		const { classes, representatives, constituencies } = this.props;
		const {
			errors, representativeId, constituencyName,
			switchToggle, shouldOpenAlert, deleteId, alert
		} = this.state;
		
		const headers = ['Constituency Name', 'Representative', 'SubCounties'];
		
		const body = constituencies.map((record) => {
			const { Representative, SubCounties } = record;
			
			const representativeName = Representative
				? `${Representative.firstName} ${Representative.lastName}`
				: undefined;
			
			return [record, record.id, record.constituencyName, representativeName, SubCounties.length];
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
				<ConstituencyComponent
					classes={classes}
					errors={errors}
					switchToggle={switchToggle}
					constituencyName={constituencyName}
					representativeId={representativeId}
					representatives={representatives}
					constituencies={constituencies}
					tableBody={body}
					headers={headers}
					handleSwitch={this.handleSwitch}
					handleSelectChange={this.handleSelectChange}
					onSubmit={this.onSubmit}
					formHasError={this.formHasError}
					onChange={this.onChange}
					onClickDelete={this.onClickDelete}
					onClickEdit={this.onClickEdit}
					onSearch={this.onSearch}
				/>
			</Fragment>
		);
	}
}

Constituency.propTypes = {
	classes: PropTypes.shape().isRequired,
	representatives: PropTypes.arrayOf(PropTypes.shape()),
	constituencies: PropTypes.arrayOf(PropTypes.shape()),
	dispatch: PropTypes.func.isRequired
};

Constituency.defaultProps = {
	representatives: [],
	constituencies: []
};

const mapStateToProps = ({ representativeReducer, constituencyReducer }) => ({
	representatives: representativeReducer.representatives,
	constituencies: constituencyReducer.constituencies
});

export default connect(mapStateToProps)(withStyles(constituencyStyles)(Constituency));
