import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NavBar from '../navBar';

class App extends React.Component {

	componentWillMount() {
		onbeforeunload = this.onUnLoad;
	}

	componentWillUnmount() {
		onbeforeunload = null;
	}

	onUnLoad = e => 'You\'ll loose your data!';

	render() {
		const { auth } = this.props;
		const { user: { username } } = auth;
		return (
			<Fragment>
				<NavBar />
				{ username }
			</Fragment>
		);
	}
}

App.propTypes = {
	auth: PropTypes.shape().isRequired
};

const mapStateToProps = state => ({ auth: state.authReducer });

export default connect(mapStateToProps)(App);
