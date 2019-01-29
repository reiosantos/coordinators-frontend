import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Home from '../home';
import NavBar from '../navBar';

class App extends React.Component {

	componentWillMount() {
		onbeforeunload = this.onUnLoad;
	}

	componentWillUnmount() {
		onbeforeunload = null;
	}

	onUnLoad = e => 'You\'ll loose your data!';

	getDisplayComponent = (currentPath) => {
		switch (currentPath) {
			case 'constituencies':
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
		pathname = pathname.replace(/\//g, '').trim();
		return (
			<Fragment>
				<NavBar component={this.getDisplayComponent(pathname)} />
			</Fragment>
		);
	}
}

App.propTypes = {
	location: PropTypes.shape().isRequired
};

const mapStateToProps = state => ({ auth: state.authReducer });

export default connect(mapStateToProps)(withRouter(App));
