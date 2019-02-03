import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchConstituencyAction } from '../../actions/contituencies';
import { fetchParishAction } from '../../actions/parishes';
import {
	addRepresentativeAction,
	deleteRepresentativeAction,
	fetchRepresentativeAction, searchRepresentatives
} from '../../actions/representatives';
import { fetchSubCountyAction } from '../../actions/subCounties';
import { fetchVillageAction } from '../../actions/villages';
import RepresentativeComponent from '../../components/main/representative';
import AlertDialog from '../../components/reusable/alert';
import { API } from '../../constants';
import constituencyStyles from '../../static/styles/constituencyStyles';
import * as Utils from '../../utils';
import {
	validateDateOfBirth,
	validateEmail,
	validatePhoneNumber,
	validateUsername
} from '../../utils/validators';

class Representative extends React.Component {
	
	validators = {
		validateFirstName: validateUsername,
		validateLastName: validateUsername,
		validateContact: validatePhoneNumber,
		validateEmail,
		validateDateOfBirth
	};
	
	constructor(props) {
		super(props);
		const { originalConstituencies } = this.props;
		
		this.state = {
			constituencyId: '',
			subCountyId: '',
			parishId: '',
			villageId: '',
			representativeId: '',
			firstName: '',
			lastName: '',
			contact: '',
			email: '',
			dateOfBirth: '1970-01-01',
			errors: {
				villageId: '',
				firstName: '',
				lastName: '',
				contact: '',
				email: '',
				dateOfBirth: ''
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
			},
			constituencies: originalConstituencies,
			subCounties: [],
			parishes: [],
			villages: [],
			
			activeStep: 0
		};
	}
	
	componentWillMount() {
		const { dispatch } = this.props;
		dispatch(fetchConstituencyAction());
		dispatch(fetchSubCountyAction());
		dispatch(fetchParishAction());
		dispatch(fetchVillageAction());
		dispatch(fetchRepresentativeAction());
	}
	
	componentWillReceiveProps(nextProps, nextContext) {
		const { originalConstituencies } = this.props;
		this.setState({ constituencies: originalConstituencies });
	}
	
	handleNext = () => {
		const { activeStep } = this.state;
		this.setState({ activeStep: activeStep + 1 });
	};
	
	handleBack = () => {
		this.setState(state => ({ activeStep: state.activeStep - 1 }));
	};
	
	handleReset = () => {
		this.setState({
			activeStep: 0,
			constituencyId: '',
			subCountyId: '',
			parishId: '',
			villageId: '',
			firstName: '',
			lastName: '',
			contact: '',
			email: '',
			dateOfBirth: '1970-01-01',
			subCounties: [],
			parishes: [],
			villages: []
		});
	};
	
	onSubmit = (event) => {
		event.preventDefault();
		const { dispatch } = this.props;
		const {
			representativeId, villageId, switchToggle: { checked },
			firstName, lastName, contact, email, dateOfBirth
		} = this.state;
		
		if (checked && !representativeId) {
			this.setState({
				shouldOpenAlert: true,
				alert: {
					message: 'To add a new representative, you must disable editing first.',
					title: 'Adding a new record'
				}
			});
			return;
		}
		const URL = checked
			? Utils.formatUrl(API.PUT_DELETE_GET_REPRESENTATIVES_URL, [representativeId])
			: API.POST_GET_REPRESENTATIVES_URL;
		
		const METHOD = checked ? 'PUT' : 'POST';
		const data = {
			villageId: villageId.trim(), firstName, lastName, contact, email, dateOfBirth
		};
		
		if (!this.formHasError()) {
			dispatch(addRepresentativeAction(data, URL, METHOD));
			this.setState({
				villageId: '',
				representativeId: null,
				activeStep: 0,
				firstName: '',
				lastName: '',
				contact: '',
				email: '',
				dateOfBirth: '1970-01-01'
			});
		}
	};
	
	onChange = name => (event) => {
		const { value } = event.target;
		this.setState(prevState => ({
			[name]: value,
			errors: {
				...prevState.errors,
				[name]: this.validators[`validate${Utils.capitalizeWord(name)}`](value)
			}
		}));
	};
	
	handleSelectChange = name => (event) => {
		const { value } = event.target;
		const update = { [name]: value };
		const {
			originalSubCounties, originalParishes, originalVillages
		} = this.props;
		
		switch (name) {
			case 'constituencyId':
				update.parishes = [];
				update.villages = [];
				Object.assign(update, {
					subCountyId: '',
					parishId: '',
					villageId: ''
				});
				if (!value || !value.trim()) {
					update.subCounties = [];
				} else {
					update.subCounties = originalSubCounties
						.filter(val => val.constituencyId === value);
				}
				break;
			case 'subCountyId':
				update.villages = [];
				Object.assign(update, {
					parishId: '',
					villageId: ''
				});
				if (!value || !value.trim()) {
					update.parishes = [];
				} else {
					update.parishes = originalParishes
						.filter(val => val.subCountyId === value);
				}
				break;
			case 'parishId':
				Object.assign(update, {
					villageId: ''
				});
				if (!value || !value.trim()) {
					update.villages = [];
				} else {
					update.villages = originalVillages
						.filter(val => val.parishId === value);
				}
				break;
			default:
				break;
		}
		this.setState({ ...update });
	};
	
	handleSwitch = (event) => {
		const record = { ...this.state };
		
		if (!event.target.checked) {
			Object.assign(record, {
				subCountyId: '',
				parishId: '',
				villageId: '',
				representativeId: null,
				firstName: '',
				lastName: '',
				contact: '',
				email: '',
				dateOfBirth: '1970-01-01'
			});
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
			firstName, lastName, contact, email, dateOfBirth
		} = this.state;
		return !!(
			this.validators.validateFirstName(firstName) ||
			this.validators.validateLastName(lastName) ||
			this.validators.validateEmail(email) ||
			this.validators.validateDateOfBirth(dateOfBirth) ||
			this.validators.validateContact(contact)
		);
	};
	
	onClickDelete = value => (event) => {
		event.preventDefault();
		this.setState({
			alert: {
				message: 'Are you sure you want to delete this Record?',
				title: 'Delete Representative'
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
			deleteRepresentativeAction(
				Utils.formatUrl(API.PUT_DELETE_GET_REPRESENTATIVES_URL, [value])
			)
		);
	};
	
	onDeclineClickDelete = () => {
		this.setState({ shouldOpenAlert: false });
	};
	
	onClickEdit = value => (event) => {
		event.preventDefault();
		const { switchToggle: { checked } } = this.state;
		const {
			originalParishes, originalSubCounties, originalConstituencies, originalVillages
		} = this.props;
		
		const village = value.Village ? value.Village : {};
		const parish = originalParishes.filter(par => par.id === village.parishId)[0];
		const subCounty = originalSubCounties.filter(sub => sub.id === parish.subCountyId)[0];
		const constituency = originalConstituencies
			.filter(con => con.id === subCounty.constituencyId)[0];
		
		const subCounties = originalSubCounties.filter(sub => sub.constituencyId === constituency.id);
		const parishes = originalParishes.filter(sub => sub.subCountyId === subCounty.id);
		const villages = originalVillages.filter(sub => sub.parishId === parish.id);
		
		if (checked) {
			this.setState({
				villageId: village.id,
				subCountyId: subCounty.id,
				parishId: parish.id,
				constituencyId: constituency.id,
				representativeId: value.id,
				firstName: value.firstName,
				lastName: value.lastName,
				contact: value.contact,
				email: value.email,
				dateOfBirth: Utils.formatDate(value.dateOfBirth),
				subCounties,
				parishes,
				villages
			});
		}
	};
	
	onSearch = (value) => {
		const { dispatch } = this.props;
		dispatch(searchRepresentatives(value));
	};
	
	render() {
		const { classes, representatives } = this.props;
		const {
			errors, representativeId, villageId, constituencyId, subCountyId, parishId,
			switchToggle, shouldOpenAlert, deleteId, alert,
			constituencies, subCounties, parishes, villages, activeStep,
			firstName, lastName, contact, email, dateOfBirth
		} = this.state;
		
		const steps = ['National Details', 'personal information'];
		const headers = ['First_Name', 'Last_Name', 'Contact', 'Date_Of_Birth', 'email', 'village'];
		
		const body = representatives.map((record) => {
			const { Village } = record;
			const villageName = Village ? Village.villageName : undefined;
			
			return [
				record, record.id, record.firstName, record.lastName, record.contact,
				Utils.formatDate(record.dateOfBirth), record.email, villageName
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
				<RepresentativeComponent
					classes={classes}
					errors={errors}
					switchToggle={switchToggle}
					
					constituencies={constituencies}
					constituencyId={constituencyId}
					subCounties={subCounties}
					subCountyId={subCountyId}
					parishes={parishes}
					parishId={parishId}
					villageId={villageId}
					villages={villages}
					
					firstName={firstName}
					lastName={lastName}
					contact={contact}
					email={email}
					dateOfBirth={dateOfBirth}
					
					representativeId={representativeId}
					representatives={representatives}
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
					
					activeStep={activeStep}
					steps={steps}
					handleNext={this.handleNext}
					handleBack={this.handleBack}
					handleReset={this.handleReset}
				/>
			</Fragment>
		);
	}
}

Representative.propTypes = {
	classes: PropTypes.shape().isRequired,
	representatives: PropTypes.arrayOf(PropTypes.shape()),
	originalConstituencies: PropTypes.arrayOf(PropTypes.shape()),
	originalSubCounties: PropTypes.arrayOf(PropTypes.shape()),
	originalParishes: PropTypes.arrayOf(PropTypes.shape()),
	originalVillages: PropTypes.arrayOf(PropTypes.shape()),
	dispatch: PropTypes.func.isRequired
};

Representative.defaultProps = {
	representatives: [],
	originalConstituencies: [],
	originalSubCounties: [],
	originalParishes: [],
	originalVillages: []
};

const mapStateToProps = ({
	representativeReducer, villageReducer, constituencyReducer, subCountyReducer, parishReducer
}) => ({
	representatives: representativeReducer.representatives,
	originalConstituencies: constituencyReducer.constituencies,
	originalSubCounties: subCountyReducer.subCounties,
	originalParishes: parishReducer.parishes,
	originalVillages: villageReducer.villages
});

export default connect(mapStateToProps)(withStyles(constituencyStyles)(Representative));
