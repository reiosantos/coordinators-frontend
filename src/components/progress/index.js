import Fab from '@material-ui/core/Fab';
import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import CheckIcon from '@material-ui/icons/Check';
import NetworkCheck from '@material-ui/icons/NetworkCheck';
import progressStyles from '../../static/styles/progressStyles';

const CircularIntegration = ({ loading, success, classes }) => {
	const buttonClass = classNames({ [classes.buttonSuccess]: success }, classes.buttonProgress);

	return (
		!loading
			? null
			: (
				<div className={classes.root}>
					<div className={classes.wrapper}>
						<Fab color="primary" className={buttonClass}>
							{success ? <CheckIcon /> : <NetworkCheck />}
						</Fab>
						{
							loading && (
								<CircularProgress
									size={68}
									className={classNames(classes.fabProgress, classes.buttonProgress)}
								/>
							)
						}
					</div>
				</div>
			)
	);
};

CircularIntegration.propTypes = {
	classes: PropTypes.shape().isRequired,
	loading: PropTypes.bool,
	success: PropTypes.bool
};

CircularIntegration.defaultProps = {
	loading: false,
	success: false
};

export default withStyles(progressStyles)(CircularIntegration);
