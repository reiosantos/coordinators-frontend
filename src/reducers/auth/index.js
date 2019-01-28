/* eslint-disable camelcase */
import ACTION_TYPE from '../../actions';
import { getCurrentUser } from '../../utils';

const initialState = {
	user: getCurrentUser(),
	error: '',
	success: ''
};

const authReducer = (state = initialState, action) => {

	const { user, message, errors } = action.payload || {};
	const { contact, name, username } = user || initialState.user;
	const userObject = {
		phoneNumber: contact,
		fullNames: name,
		username
	};

	switch (action.type) {
		case ACTION_TYPE.SIGN_UP:
			return {
				...state,
				user: userObject,
				error: errors,
				success: message
			};

		case ACTION_TYPE.LOG_OUT:
			return { ...initialState };

		default:
			return { ...state, user: userObject };
	}
};

export default authReducer;
