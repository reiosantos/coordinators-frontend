import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import DisplayTable from '../../reusable/displayTable';
import DisplayTree from '../../reusable/displayTree';
import SearchBar from '../../reusable/searchBar';
import UserForm from './userForm';
import MainCard from '../../reusable/mainCard';
import TabbedPage from '../../reusable/tabs/tabbedPage';

/**
 * The main constituency component
 * @param props
 * @constructor
 */
const UserComponent = (props) => {
	const {
		users, classes, errors, formHasError, headers, onChange, onClickDelete, onClickEdit,
		onSubmit, tableBody, handleSwitch, switchToggle, onSearch, handleClickShowPassword,
		username, contact, password, isSuperUser, isAdmin, showPassword
	} = props;
	
	return (
		<MainCard>
			<div className={classes.root}>
				<Grid container spacing={24}>
					<Grid item xs={12}>
						<Typography variant="h5" component="h5" align="center">
							{'Authorized Users'}
						</Typography>
					</Grid>
					<Grid item xs={12} sm={12} md={4} lg={4} />
					<Grid item xs={12} sm={12} md={8} lg={8}>
						<SearchBar onRequestSearch={onSearch} />
					</Grid>
					<Grid item xs={12} sm={12} md={4} lg={4}>
						<UserForm
							showPassword={showPassword}
							handleClickShowPassword={handleClickShowPassword}
							username={username}
							contact={contact}
							password={password}
							isAdmin={isAdmin}
							isSuperUser={isSuperUser}
							handleSwitch={handleSwitch}
							switchToggle={switchToggle}
							errors={errors}
							classes={classes}
							formHasError={formHasError}
							onChange={onChange}
							onSubmit={onSubmit}
						/>
					</Grid>
					<Grid item xs={12} sm={12} md={8} lg={8}>
						<Paper className={classNames(classes.paper, 'json-tree')}>
							<TabbedPage
								treeComponent={() => (
									<DisplayTree data={users} />
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

UserComponent.propTypes = {
	classes: PropTypes.shape().isRequired,
	errors: PropTypes.shape().isRequired,
	switchToggle: PropTypes.shape().isRequired,
	tableBody: PropTypes.arrayOf(PropTypes.array).isRequired,
	headers: PropTypes.arrayOf(PropTypes.string).isRequired,
	users: PropTypes.arrayOf(PropTypes.shape()).isRequired,
	
	username: PropTypes.string.isRequired,
	contact: PropTypes.string.isRequired,
	password: PropTypes.string.isRequired,
	isSuperUser: PropTypes.bool.isRequired,
	isAdmin: PropTypes.bool.isRequired,
	showPassword: PropTypes.bool.isRequired,
	
	onSubmit: PropTypes.func.isRequired,
	formHasError: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired,
	onClickDelete: PropTypes.func.isRequired,
	onClickEdit: PropTypes.func.isRequired,
	handleSwitch: PropTypes.func.isRequired,
	onSearch: PropTypes.func.isRequired,
	handleClickShowPassword: PropTypes.func.isRequired
};

export default UserComponent;
