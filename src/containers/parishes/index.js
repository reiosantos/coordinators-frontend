import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import {
	addParishAction,
	deleteParishAction,
	fetchParishAction,
	searchParishes
} from '../../actions/parishes';
import { fetchRepresentativeAction } from '../../actions/representatives';
import { fetchSubCountyAction } from '../../actions/subCounties';
import ParishComponent from '../../components/main/parish';
import AlertDialog from '../../components/reusable/alert';
import { API } from '../../constants';
import constituencyStyles from '../../static/styles/constituencyStyles';
import { formatUrl } from '../../utils';
import { validateUsername } from '../../utils/validators';

class Parish extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			parishId: '',
			subCountyId: '',
			representativeId: '',
			parishName: '',
			errors: {
				representativeId: '',
				subCountyId: '',
				parishName: ''
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
		dispatch(fetchRepresentativeAction());
		dispatch(fetchSubCountyAction());
		dispatch(fetchParishAction());
	}

	onSubmit = (event) => {
		event.preventDefault();
		const { dispatch } = this.props;
		const {
			representativeId, parishName, parishId, subCountyId, switchToggle: { checked }
		} = this.state;
		
		if (checked && !parishId) {
			this.setState({
				shouldOpenAlert: true,
				alert: {
					message: 'To create a new sub county, you must disable editing first.',
					title: 'Adding a new record'
				}
			});
			return;
		}
		const URL = checked
			? formatUrl(API.PUT_DELETE_GET_PARISHES_URL, [parishId])
			: API.POST_GET_PARISHES_URL;
		
		const METHOD = checked ? 'PUT' : 'POST';
		const data = {
			representativeId: representativeId.trim() || undefined, parishName, subCountyId
		};
		
		if (!this.formHasError()) {
			dispatch(addParishAction(data, URL, METHOD));
			this.setState({
				representativeId: '', parishName: '', parishId: '', subCountyId: ''
			});
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
	
	handleSelectChange = name => (event) => {
		const { value } = event.target;
		this.setState({ [name]: value });
	};
	
	handleSwitch = (event) => {
		const record = { ...this.state };
		
		if (!event.target.checked) {
			record.representativeId = '';
			record.subCountyId = '';
			record.parishId = null;
			record.parishName = '';
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
		const { parishName } = this.state;
		return !!validateUsername(parishName);
	};
	
	onClickDelete = value => (event) => {
		event.preventDefault();
		this.setState({
			alert: {
				message: 'Are you sure you want to delete this Record?',
				title: 'Delete Parishes'
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
			deleteParishAction(formatUrl(API.PUT_DELETE_GET_PARISHES_URL, [value]))
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
				parishId: value.id,
				parishName: value.parishName,
				subCountyId: value.SubCounty ? value.SubCounty.id : '',
				representativeId: value.Representative ? value.Representative.id : ''
			});
		}
	};
	
	onSearch = (value) => {
		const { dispatch } = this.props;
		dispatch(searchParishes(value));
	};
	
	render() {
		const {
			classes, representatives, parishes, subCounties
		} = this.props;
		const {
			errors, representativeId, parishName, subCountyId,
			switchToggle, shouldOpenAlert, deleteId, alert
		} = this.state;
		
		const headers = ['Parish Name', 'Sub County', 'Representative', 'Villages'];
		
		const body = parishes.map((record) => {
			const { Representative, SubCounty, Villages } = record;
			const representativeName = Representative
				? `${Representative.firstName} ${Representative.lastName}`
				: undefined;
			
			return [
				record, record.id, record.parishName,
				SubCounty.subCountyName, representativeName, Villages.length
			];
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
				<ParishComponent
					classes={classes}
					errors={errors}
					switchToggle={switchToggle}
					parishName={parishName}
					representativeId={representativeId}
					representatives={representatives}
					parishes={parishes}
					subCounties={subCounties}
					subCountyId={subCountyId}
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

Parish.propTypes = {
	classes: PropTypes.shape().isRequired,
	representatives: PropTypes.arrayOf(PropTypes.shape()),
	parishes: PropTypes.arrayOf(PropTypes.shape()),
	subCounties: PropTypes.arrayOf(PropTypes.shape()),
	dispatch: PropTypes.func.isRequired
};

Parish.defaultProps = {
	representatives: [],
	parishes: [],
	subCounties: []
};

const mapStateToProps = ({ representativeReducer, parishReducer, subCountyReducer }) => ({
	representatives: representativeReducer.representatives,
	parishes: parishReducer.parishes,
	subCounties: subCountyReducer.subCounties
});

export default connect(mapStateToProps)(withStyles(constituencyStyles)(Parish));
