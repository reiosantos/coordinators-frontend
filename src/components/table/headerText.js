import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid/Grid';
import Typography from '@material-ui/core/Typography/Typography';

const HeaderText = ({ title, classes }) => (
	<Grid container spacing={24} className={classes.grid}>
		<Fragment>
			<Grid item xs={12} sm={12} md={12} lg={12}>
				<Typography variant="h6" component="h6" align="center">{title}</Typography>
			</Grid>
		</Fragment>
	</Grid>
);

HeaderText.propTypes = {
	classes: PropTypes.shape().isRequired,
	title: PropTypes.string.isRequired
};

export default HeaderText;
