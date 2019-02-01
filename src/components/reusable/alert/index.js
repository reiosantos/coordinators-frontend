import * as PropTypes from 'prop-types';
import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = props => <Slide direction="up" {...props} />;

class AlertDialog extends React.Component {
	state = {
		open: false
	};
	
	componentWillReceiveProps(nextProps, nextContext) {
		this.setState({ open: nextProps.open });
	}
	
	handleClose = hasAgreed => () => {
		this.setState({ open: false }, () => {
			const { onAccept, onDecline } = this.props;
			if (hasAgreed) {
				return onAccept();
			}
			return onDecline();
		});
	};
	
	render() {
		const { open } = this.state;
		const { message, title } = this.props;
		return (
			<div>
				<Dialog
					open={open}
					TransitionComponent={Transition}
					keepMounted
					onClose={this.handleClose(false)}
					aria-labelledby="alert-dialog-slide-title"
					aria-describedby="alert-dialog-slide-description"
				>
					<DialogTitle id="alert-dialog-slide-title">
						{title}
					</DialogTitle>
					<DialogContent>
						<DialogContentText id="alert-dialog-slide-description">
							{message}
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={this.handleClose(false)} color="default">
							{'Disagree'}
						</Button>
						<Button onClick={this.handleClose(true)} color="primary">
							{'Agree'}
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}

AlertDialog.propTypes = {
	open: PropTypes.bool.isRequired,
	message: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	onAccept: PropTypes.func.isRequired,
	onDecline: PropTypes.func.isRequired
};

export default AlertDialog;
