import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import React from 'react';
import mainCardStyles from '../../static/styles/mainCardStyles';

const MainCard = ({ classes, children }) => (
	<Card className={classes.card}>
		<CardContent>
			{ children }
		</CardContent>
	</Card>
);

MainCard.propTypes = {
	classes: PropTypes.shape().isRequired,
	children: PropTypes.any.isRequired
};

export default withStyles(mainCardStyles)(MainCard);
