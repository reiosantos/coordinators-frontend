import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchParishAction } from '../../actions/parishes';
import { fetchRepresentativeAction } from '../../actions/representatives';
import {
	addVillageAction,
	deleteVillageAction,
	fetchVillageAction,
	searchVillages
} from '../../actions/villages';
import VillageComponent from '../../components/main/village';
import AlertDialog from '../../components/reusable/alert';
import { API } from '../../constants';
import constituencyStyles from '../../static/styles/constituencyStyles';
import { formatUrl } from '../../utils';
import { validateUsername } from '../../utils/validators';

class Village extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			parishId: '',
			villageId: '',
			representativeId: '',
			villageName: '',
			errors: {
				representativeId: '',
				parishId: '',
				villageName: ''
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
		dispatch(fetchParishAction());
		dispatch(fetchVillageAction());
	}

	onSubmit = (event) => {
		event.preventDefault();
		const { dispatch } = this.props;
		const {
			representativeId, villageName, parishId, villageId, switchToggle: { checked }
		} = this.state;
		
		if (checked && !villageId) {
			this.setState({
				shouldOpenAlert: true,
				alert: {
					message: 'To create a new Village, you must disable editing first.',
					title: 'Adding a new record'
				}
			});
			return;
		}
		const URL = checked
			? formatUrl(API.PUT_DELETE_GET_VILLAGES_URL, [villageId])
			: API.POST_GET_VILLAGES_URL;
		
		const METHOD = checked ? 'PUT' : 'POST';
		const data = {
			representativeId: representativeId.trim() || undefined, villageName, parishId
		};
		
		if (!this.formHasError()) {
			dispatch(addVillageAction(data, URL, METHOD));
			this.setState({
				representativeId: '', villageName: '', parishId: '', villageId: ''
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
			record.parishId = '';
			record.villageId = null;
			record.villageName = '';
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
		const { villageName } = this.state;
		return !!validateUsername(villageName);
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
			deleteVillageAction(formatUrl(API.PUT_DELETE_GET_VILLAGES_URL, [value]))
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
				villageId: value.id,
				villageName: value.villageName,
				parishId: value.Parish ? value.Parish.id : '',
				representativeId: value.Representative ? value.Representative.id : ''
			});
		}
	};
	
	onSearch = (value) => {
		const { dispatch } = this.props;
		dispatch(searchVillages(value));
	};
	
	render() {
		const {
			classes, representatives, parishes, villages
		} = this.props;
		const {
			errors, representativeId, villageName, parishId,
			switchToggle, shouldOpenAlert, deleteId, alert
		} = this.state;
		
		const headers = ['Village Name', 'Parish', 'Representative'];
		
		const body = villages.map((record) => {
			const { Representative, Parish } = record;
			const representativeName = Representative
				? `${Representative.firstName} ${Representative.lastName}`
				: undefined;
			
			return [record, record.id, record.villageName, Parish.parishName, representativeName];
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
				<VillageComponent
					classes={classes}
					errors={errors}
					switchToggle={switchToggle}
					villageName={villageName}
					representativeId={representativeId}
					representatives={representatives}
					parishes={parishes}
					villages={villages}
					parishId={parishId}
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

Village.propTypes = {
	classes: PropTypes.shape().isRequired,
	representatives: PropTypes.arrayOf(PropTypes.shape()),
	parishes: PropTypes.arrayOf(PropTypes.shape()),
	villages: PropTypes.arrayOf(PropTypes.shape()),
	dispatch: PropTypes.func.isRequired
};

Village.defaultProps = {
	representatives: [],
	parishes: [],
	villages: []
};

const mapStateToProps = ({ representativeReducer, parishReducer, villageReducer }) => ({
	representatives: representativeReducer.representatives,
	parishes: parishReducer.parishes,
	villages: villageReducer.villages
});

export default connect(mapStateToProps)(withStyles(constituencyStyles)(Village));
