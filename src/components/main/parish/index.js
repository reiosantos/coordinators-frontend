import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import DisplayTable from '../../reusable/displayTable';
import DisplayTree from '../../reusable/displayTree';
import SearchBar from '../../reusable/searchBar';
import ParishForm from './parishForm';
import MainCard from '../../reusable/mainCard';
import TabbedPage from '../../reusable/tabs/tabbedPage';

/**
 * The main constituency component
 * @param props
 * @constructor
 */
const ParishComponent = (props) => {
	const {
		subCounties, parishes, classes, parishName, errors, formHasError, handleSelectChange,
		headers, onChange, onClickDelete, onClickEdit, onSubmit, representativeId,
		representatives, tableBody, handleSwitch, switchToggle, onSearch, subCountyId
	} = props;
	
	return (
		<MainCard>
			<div className={classes.root}>
				<Grid container spacing={24}>
					<Grid item xs={12}>
						<Typography variant="h5" component="h5" align="center">
							{'Parishes'}
						</Typography>
					</Grid>
					<Grid item xs={12} sm={12} md={4} lg={4} />
					<Grid item xs={12} sm={12} md={8} lg={8}>
						<SearchBar onRequestSearch={onSearch} />
					</Grid>
					<Grid item xs={12} sm={12} md={4} lg={4}>
						<ParishForm
							handleSwitch={handleSwitch}
							switchToggle={switchToggle}
							errors={errors}
							classes={classes}
							parishName={parishName}
							onSubmit={onSubmit}
							subCounties={subCounties}
							subCountyId={subCountyId}
							representativeId={representativeId}
							formHasError={formHasError}
							onChange={onChange}
							handleSelectChange={handleSelectChange}
							representatives={representatives}
						/>
					</Grid>
					<Grid item xs={12} sm={12} md={8} lg={8}>
						<Paper className={classNames(classes.paper, 'json-tree')}>
							<TabbedPage
								treeComponent={() => (
									<DisplayTree data={parishes} />
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

ParishComponent.propTypes = {
	classes: PropTypes.shape().isRequired,
	errors: PropTypes.shape().isRequired,
	switchToggle: PropTypes.shape().isRequired,
	parishName: PropTypes.string.isRequired,
	representativeId: PropTypes.string.isRequired,
	subCountyId: PropTypes.string.isRequired,
	representatives: PropTypes.arrayOf(PropTypes.shape()).isRequired,
	parishes: PropTypes.arrayOf(PropTypes.shape()).isRequired,
	subCounties: PropTypes.arrayOf(PropTypes.shape()).isRequired,
	tableBody: PropTypes.arrayOf(PropTypes.array).isRequired,
	headers: PropTypes.arrayOf(PropTypes.string).isRequired,
	
	handleSelectChange: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
	formHasError: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired,
	onClickDelete: PropTypes.func.isRequired,
	onClickEdit: PropTypes.func.isRequired,
	handleSwitch: PropTypes.func.isRequired,
	onSearch: PropTypes.func.isRequired
};

export default ParishComponent;
