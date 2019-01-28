import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import App from '../components/app/app';
import { PrivateRoute } from '../components/privateRoute';
import LogIn from '../containers/auth/login';
import Logout from '../containers/auth/logout';
import SignUp from '../containers/auth/signup';

const Routes = () => (
	<Router>
		<Switch>
			<Route component={LogIn} path="/login" exact />
			<PrivateRoute component={SignUp} path="/signup" exact />
			<PrivateRoute component={Logout} path="/logout" exact />
			<PrivateRoute component={App} path="/" exact />
			<PrivateRoute component={App} path="*" />
		</Switch>
	</Router>
);

export default Routes;
