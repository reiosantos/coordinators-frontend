import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton/IconButton';
import Snackbar from '@material-ui/core/Snackbar/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent/SnackbarContent';
import withStyles from '@material-ui/core/styles/withStyles';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CloseIcon from '@material-ui/icons/Close';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';
import snackBarStyles from '../../../static/styles/snackBarStyles';

const variantIcon = {
	success: CheckCircleIcon,
	warning: WarningIcon,
	error: ErrorIcon,
	info: InfoIcon
};

const CustomizedSnackBar = (props) => {

	const {
		open, handleClose, message, variant, classes
	} = props;

	const Icon = variantIcon[variant];

	return (
		<Snackbar
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			open={open}
			style={{ marginTop: '5em' }}
			autoHideDuration={6000}
			onClose={handleClose}
		>
			<SnackbarContent
				className={classNames(classes[variant])}
				aria-describedby="client-snackBar"
				message={(
					<span id="client-snackBar" className={classes.message}>
						<Icon className={classNames(classes.icon, classes.iconVariant)} />
						{message}
					</span>
				)}
				action={[
					<IconButton
						key="close"
						aria-label="Close"
						color="inherit"
						className={classes.close}
						onClick={handleClose}
					>
						<CloseIcon className={classes.icon} />
					</IconButton>
				]}
			/>
		</Snackbar>
	);
};

CustomizedSnackBar.propTypes = {
	classes: PropTypes.shape().isRequired,
	open: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
	message: PropTypes.string.isRequired,
	variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired
};

export default withStyles(snackBarStyles)(CustomizedSnackBar);
