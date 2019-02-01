import React from 'react';
import jwtDecode from 'jwt-decode';
import { Redirect, Route } from 'react-router-dom';
import { logoutActionCreator } from '../../actions/auth';
import { AUTH_TOKEN, PROPERTY_USER } from '../../constants';

export const Authenticate = {
	isAuthenticated() {
		try {
			let token = localStorage.getItem(AUTH_TOKEN);
			const user = JSON.parse(localStorage.getItem(PROPERTY_USER));
			token = jwtDecode(token);
			return !!token && !!token.identity && !!user;
		} catch (e) {
			localStorage.clear();
			return false;
		}
	},
	userDetails() {
		try {
			let token = localStorage.getItem(AUTH_TOKEN);
			token = jwtDecode(token);
			return token || {};
		} catch (e) {
			return {};
		}
	},
	logout(dispatch) {
		localStorage.clear();
		dispatch(logoutActionCreator());
	}
};

export const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route
		{...rest}
		render={props => (
			Authenticate.isAuthenticated() === true
				? <Component {...props} />
				: (
					<Redirect to={{
						pathname: '/login',
						state: { from: props.location }
					}}
					/>
				)
		)}
	/>
);
