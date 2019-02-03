import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import snackAction from '../../actions/snack';
import Constituency from '../../containers/constituencies';
import Parish from '../../containers/parishes';
import Representative from '../../containers/representatives';
import SubCounty from '../../containers/subCounties';
import User from '../../containers/users';
import Village from '../../containers/villages';
import Home from '../home';
import { Authenticate } from '../privateRoute';
import NavBar from '../reusable/navBar';
import CircularIntegration from '../reusable/progress';
import CustomizedSnackBar from '../reusable/snackBar';

class App extends React.Component {
	
	componentWillMount() {
		onbeforeunload = this.onUnLoad;
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
				return SubCounty;
			case 'parishes':
				return Parish;
			case 'villages':
				return Village;
			case 'representatives':
				return Representative;
			case 'users':
				return User;
			default:
				return Home;
		}
	};
	
	render() {
		let { location: { pathname } } = this.props;
		const { snack, progress: loader } = this.props;
		const { open, message, variant } = snack;
		
		const defaultRoute = '/';
		pathname = pathname.replace(/\//g, '').trim();
		
		const user = Authenticate.userDetails();
		if (!user.isSuperUser && pathname === 'users') {
			window.location.assign(defaultRoute);
			return null;
		}
		
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
	location: PropTypes.shape().isRequired,
	snack: PropTypes.shape().isRequired,
	progress: PropTypes.shape().isRequired,
	dispatch: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	auth: state.authReducer,
	progress: state.progressReducer,
	snack: state.snackReducer
});

export default connect(mapStateToProps)(withRouter(App));
