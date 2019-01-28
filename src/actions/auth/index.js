import axios from 'axios';
import ACTION_TYPE from '..';
import { AUTH_TOKEN, PROPERTY_USER } from '../../constants';
import { addToken } from '../../utils';

export const signUpActionCreator = data => ({
	type: ACTION_TYPE.SIGN_UP,
	payload: data
});

export const logoutActionCreator = () => ({
	type: ACTION_TYPE.LOG_OUT
});

export const authAction = (requestData, URL) => (dispatch) => {
	addToken();

	const {
		password, userType, fullNames, username, phoneNumber
	} = requestData;
	const userData = {
		password,
		username,
		user_type: userType,
		contact: phoneNumber,
		full_name: fullNames
	};

	return axios.post(URL, { ...userData })
		.then(response => response.data)
		.then((response) => {
			const { user: { name, token } } = response;

			localStorage.setItem(AUTH_TOKEN, token);
			localStorage.setItem(PROPERTY_USER, JSON.stringify({ username: name }));

			dispatch(signUpActionCreator(response));
		})
		.catch((error) => {
			const { response: { data } } = error;
			dispatch(signUpActionCreator(data || {}));
		});
};
