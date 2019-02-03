import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchConstituencyAction } from '../../actions/contituencies';
import { fetchRepresentativeAction } from '../../actions/representatives';
import {
	addSubCountyAction, deleteSubCountyAction,
	fetchSubCountyAction,
	searchSubCounties
} from '../../actions/subCounties';
import { fetchVillageAction } from '../../actions/villages';
import SubCountyComponent from '../../components/main/subCounty';
import AlertDialog from '../../components/reusable/alert';
import { API } from '../../constants';
import constituencyStyles from '../../static/styles/constituencyStyles';
import { formatUrl, isRepresentativeAvailable } from '../../utils';
import { validateUsername } from '../../utils/validators';

class SubCounty extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			constituencyId: '',
			subCountyId: '',
			representativeId: '',
			subCountyName: '',
			errors: {
				representativeId: '',
				constituencyId: '',
				subCountyName: ''
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
		dispatch(fetchSubCountyAction());
		dispatch(fetchVillageAction());
	}

	onSubmit = (event) => {
		event.preventDefault();
		const { dispatch } = this.props;
		const {
			representativeId, subCountyName, constituencyId, subCountyId, switchToggle: { checked }
		} = this.state;
		
		if (checked && !subCountyId) {
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
			? formatUrl(API.PUT_DELETE_GET_SUB_COUNTY_URL, [subCountyId])
			: API.POST_GET_SUB_COUNTY_URL;
		
		const METHOD = checked ? 'PUT' : 'POST';
		const data = {
			representativeId: representativeId.trim() || undefined, subCountyName, constituencyId
		};
		
		if (!this.formHasError()) {
			dispatch(addSubCountyAction(data, URL, METHOD));
			this.setState({
				representativeId: '', subCountyName: '', constituencyId: '', subCountyId: ''
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
			record.constituencyId = '';
			record.subCountyId = null;
			record.subCountyName = '';
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
		const { subCountyName } = this.state;
		return !!validateUsername(subCountyName);
	};
	
	onClickDelete = value => (event) => {
		event.preventDefault();
		this.setState({
			alert: {
				message: 'Are you sure you want to delete this Record?',
				title: 'Delete SubCounty'
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
			deleteSubCountyAction(
				formatUrl(API.PUT_DELETE_GET_SUB_COUNTY_URL, [value])
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
				subCountyId: value.id,
				subCountyName: value.subCountyName,
				constituencyId: value.Constituency ? value.Constituency.id : '',
				representativeId: value.Representative ? value.Representative.id : ''
			});
		}
	};
	
	onSearch = (value) => {
		const { dispatch } = this.props;
		dispatch(searchSubCounties(value));
	};
	
	isAvailable = (representative) => {
		const { villages } = this.props;
		return isRepresentativeAvailable(representative, villages);
	};
	
	render() {
		const {
			classes, representatives, constituencies, subCounties
		} = this.props;
		const {
			errors, representativeId, subCountyName, constituencyId,
			switchToggle, shouldOpenAlert, deleteId, alert
		} = this.state;
		
		const headers = ['SubCounty Name', 'Constituency', 'Representative', 'Parishes'];
		
		const body = subCounties.map((record) => {
			const { Representative, Constituency, Parishes } = record;
			const representativeName = Representative
				? `${Representative.firstName} ${Representative.lastName}`
				: undefined;
			
			return [
				record, record.id, record.subCountyName,
				Constituency.constituencyName, representativeName, Parishes.length
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
				<SubCountyComponent
					classes={classes}
					errors={errors}
					switchToggle={switchToggle}
					subCountyName={subCountyName}
					representativeId={representativeId}
					representatives={representatives}
					constituencies={constituencies}
					subCounties={subCounties}
					constituencyId={constituencyId}
					tableBody={body}
					headers={headers}
					isAvailable={this.isAvailable}
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

SubCounty.propTypes = {
	classes: PropTypes.shape().isRequired,
	representatives: PropTypes.arrayOf(PropTypes.shape()),
	constituencies: PropTypes.arrayOf(PropTypes.shape()),
	subCounties: PropTypes.arrayOf(PropTypes.shape()),
	villages: PropTypes.arrayOf(PropTypes.shape()),
	dispatch: PropTypes.func.isRequired
};

SubCounty.defaultProps = {
	representatives: [],
	constituencies: [],
	subCounties: [],
	villages: []
};

const mapStateToProps = ({
	representativeReducer, constituencyReducer, subCountyReducer, villageReducer
}) => ({
	representatives: representativeReducer.representatives,
	constituencies: constituencyReducer.constituencies,
	subCounties: subCountyReducer.subCounties,
	villages: villageReducer.villages
	
});

export default connect(mapStateToProps)(withStyles(constituencyStyles)(SubCounty));
