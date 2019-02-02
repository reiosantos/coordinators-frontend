import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import DisplayTable from '../../reusable/displayTable';
import DisplayTree from '../../reusable/displayTree';
import SearchBar from '../../reusable/searchBar';
import RepresentativeForm from './representativeForm';
import MainCard from '../../reusable/mainCard';
import TabbedPage from '../../reusable/tabs/tabbedPage';

/**
 * The main constituency component
 * @param props
 * @constructor
 */
const RepresentativeComponent = (props) => {
	const {
		villages, villageId, classes, errors, formHasError, handleSelectChange,
		headers, onChange, onClickDelete, onClickEdit, onSubmit,
		tableBody, handleSwitch, switchToggle, onSearch, representatives,
		constituencies, constituencyId, subCounties, subCountyId, parishes, parishId,
		steps, activeStep, handleBack, handleNext, handleReset,
		firstName, lastName, contact, email, dateOfBirth
	} = props;
	
	return (
		<MainCard>
			<div className={classes.root}>
				<Grid container spacing={24}>
					<Grid item xs={12}>
						<Typography variant="h5" component="h5" align="center">
							{'Representatives'}
						</Typography>
					</Grid>
					<Grid item xs={12} sm={12} md={4} lg={4} />
					<Grid item xs={12} sm={12} md={8} lg={8}>
						<SearchBar onRequestSearch={onSearch} />
					</Grid>
					<Grid item xs={12} sm={12} md={4} lg={4}>
						<RepresentativeForm
							steps={steps}
							activeStep={activeStep}
							handleBack={handleBack}
							handleNext={handleNext}
							handleReset={handleReset}
							constituencies={constituencies}
							constituencyId={constituencyId}
							subCounties={subCounties}
							subCountyId={subCountyId}
							parishes={parishes}
							parishId={parishId}
							villages={villages}
							villageId={villageId}
							firstName={firstName}
							lastName={lastName}
							contact={contact}
							email={email}
							dateOfBirth={dateOfBirth}
							handleSwitch={handleSwitch}
							switchToggle={switchToggle}
							errors={errors}
							classes={classes}
							onSubmit={onSubmit}
							formHasError={formHasError}
							onChange={onChange}
							handleSelectChange={handleSelectChange}
						/>
					</Grid>
					<Grid item xs={12} sm={12} md={8} lg={8}>
						<Paper className={classNames(classes.paper, 'json-tree')}>
							<TabbedPage
								treeComponent={() => (
									<DisplayTree data={representatives} />
								)}
								tabularComponent={() => (
									<DisplayTable
										isEditing={switchToggle.checked}
										headers={headers}
										onClickEdit={onClickEdit}
										onClickDelete={onClickDelete}
										entries={tableBody}
									/>
								)}
							/>
						</Paper>
					</Grid>
				</Grid>
			</div>
		</MainCard>
	);
};

RepresentativeComponent.propTypes = {
	classes: PropTypes.shape().isRequired,
	errors: PropTypes.shape().isRequired,
	switchToggle: PropTypes.shape().isRequired,
	representatives: PropTypes.arrayOf(PropTypes.shape()).isRequired,
	
	villageId: PropTypes.string.isRequired,
	villages: PropTypes.arrayOf(PropTypes.shape()).isRequired,
	constituencies: PropTypes.arrayOf(PropTypes.shape()).isRequired,
	constituencyId: PropTypes.string.isRequired,
	subCounties: PropTypes.arrayOf(PropTypes.shape()).isRequired,
	subCountyId: PropTypes.string.isRequired,
	parishes: PropTypes.arrayOf(PropTypes.shape()).isRequired,
	parishId: PropTypes.string.isRequired,
	
	tableBody: PropTypes.arrayOf(PropTypes.array).isRequired,
	headers: PropTypes.arrayOf(PropTypes.string).isRequired,
	
	handleSelectChange: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
	formHasError: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired,
	onClickDelete: PropTypes.func.isRequired,
	onClickEdit: PropTypes.func.isRequired,
	handleSwitch: PropTypes.func.isRequired,
	onSearch: PropTypes.func.isRequired,
	
	steps: PropTypes.array.isRequired,
	activeStep: PropTypes.number.isRequired,
	handleBack: PropTypes.func.isRequired,
	handleNext: PropTypes.func.isRequired,
	handleReset: PropTypes.func.isRequired,
	
	firstName: PropTypes.string.isRequired,
	lastName: PropTypes.string.isRequired,
	contact: PropTypes.string.isRequired,
	email: PropTypes.string.isRequired,
	dateOfBirth: PropTypes.string.isRequired
};

export default RepresentativeComponent;
