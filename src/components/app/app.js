import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import snackAction from '../../actions/snack';
import Constituency from '../../containers/constituencies';
import Home from '../home';
import NavBar from '../navBar';
import CircularIntegration from '../progress';
import CustomizedSnackBar from '../snackBar';

class App extends React.Component {
	
	componentWillMount() {
		// onbeforeunload = this.onUnLoad;
	}
	
	componentWillUnmount() {
		onbeforeunload = null;
	}
	
	handleSnackClose = (event, reason) => {
		const { dispatch } = this.props;
		dispatch(snackAction(undefined, false));
	};
	
	onUnLoad = e => 'You\'ll loose your data!';

	getDisplayComponent = (currentPath) => {
		switch (currentPath) {
			case 'constituencies':
				return Constituency;
			case 'sub-counties':
			case 'parishes':
			case 'villages':
			case 'representatives':
			case 'users':
			default:
				return Home;
		}
	};
	
	render() {
		let { location: { pathname } } = this.props;
		const { snack, progress: loader } = this.props;
		const { open, message, variant } = snack;
		
		pathname = pathname.replace(/\//g, '').trim();
		return (
			<Fragment>
				<CircularIntegration {...loader} />
				
				<CustomizedSnackBar
					variant={variant}
					open={open}
					handleClose={this.handleSnackClose}
					message={message}
				/>
				
				<NavBar component={this.getDisplayComponent(pathname)} />
			</Fragment>
		);
	}
}

App.propTypes = {
	location: PropTypes.shape().isRequired
};

const mapStateToProps = state => ({
	auth: state.authReducer,
	progress: state.progressReducer,
	snack: state.snackReducer
});

export default connect(mapStateToProps)(withRouter(App));
