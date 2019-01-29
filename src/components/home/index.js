import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import * as PropTypes from 'prop-types';
import React from 'react';

const styles = theme => ({
	root: {
		color: theme.palette.common.white,
		position: 'relative',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		[theme.breakpoints.up('sm')]: {
			height: '100vh',
			minHeight: 500,
			maxHeight: 1300
		}
	},
	button: {
		minWidth: 200
	},
	h5: {
		marginBottom: theme.spacing.unit * 4,
		marginTop: theme.spacing.unit * 4,
		[theme.breakpoints.up('sm')]: {
			marginTop: theme.spacing.unit * 10
		}
	},
	more: {
		marginTop: theme.spacing.unit * 2
	}
});

const Home = ({ classes }) => (
	<div className={classes.root}>
		<Typography color="inherit" align="center" variant="h2" marked="center">Upgrade your Governance</Typography>
		<Typography color="inherit" align="center" variant="h5" className={classes.h5}>
			<span>Enjoy 70% secret offers of the silent majority.</span>
		</Typography>
		<Typography variant="body2" color="inherit" className={classes.more}>
			<>Lets change the cord</>
		</Typography>
		<img height={96} width={108} src="https://i.imgur.com/gJAW1ED.png" alt="" />
	</div>
);

Home.propTypes = {
	classes: PropTypes.shape({}).isRequired
};

export default withStyles(styles)(Home);
