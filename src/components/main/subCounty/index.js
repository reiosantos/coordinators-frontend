import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import DisplayTable from '../../reusable/displayTable';
import DisplayTree from '../../reusable/displayTree';
import SearchBar from '../../reusable/searchBar';
import SubCountyForm from './subCountyForm';
import MainCard from '../../reusable/mainCard';
import TabbedPage from '../../reusable/tabs/tabbedPage';

/**
 * The main constituency component
 * @param props
 * @constructor
 */
const SubCountyComponent = (props) => {
	const {
		subCounties, constituencies, classes, subCountyName, errors, formHasError, handleSelectChange,
		headers, onChange, onClickDelete, onClickEdit, onSubmit, representativeId,
		representatives, tableBody, handleSwitch, switchToggle, onSearch, constituencyId
	} = props;
	
	return (
		<MainCard>
			<div className={classes.root}>
				<Grid container spacing={24}>
					<Grid item xs={12}>
						<Typography variant="h5" component="h5" align="center">
							{'Sub Counties'}
						</Typography>
					</Grid>
					<Grid item xs={12} sm={12} md={4} lg={4} />
					<Grid item xs={12} sm={12} md={8} lg={8}>
						<SearchBar onRequestSearch={onSearch} />
					</Grid>
					<Grid item xs={12} sm={12} md={4} lg={4}>
						<SubCountyForm
							handleSwitch={handleSwitch}
							switchToggle={switchToggle}
							errors={errors}
							classes={classes}
							subCountyName={subCountyName}
							onSubmit={onSubmit}
							constituencies={constituencies}
							constituencyId={constituencyId}
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
									<DisplayTree data={subCounties} />
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

SubCountyComponent.propTypes = {
	classes: PropTypes.shape().isRequired,
	errors: PropTypes.shape().isRequired,
	switchToggle: PropTypes.shape().isRequired,
	subCountyName: PropTypes.string.isRequired,
	representativeId: PropTypes.string.isRequired,
	constituencyId: PropTypes.string.isRequired,
	representatives: PropTypes.arrayOf(PropTypes.shape()).isRequired,
	subCounties: PropTypes.arrayOf(PropTypes.shape()).isRequired,
	constituencies: PropTypes.arrayOf(PropTypes.shape()).isRequired,
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

export default SubCountyComponent;
