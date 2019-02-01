import axios from 'axios';
import moment from 'moment';
import progressAction from '../actions/progress';
import snackAction from '../actions/snack';
import { AUTH_TOKEN, PROPERTY_USER } from '../constants';

export const formatDate = (dateStr) => {
	moment.updateLocale('en', {
		weekdaysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
	});
	const date = new Date(dateStr);
	return moment(date).format('ddd, MMM Do YYYY');
};

export const addToken = () => {
	const TOKEN = localStorage.getItem(AUTH_TOKEN);

	if (TOKEN !== null) {
		axios.defaults.headers.common.Authorization = `Token ${TOKEN}`;
	}
};

export const capitalizeWord = (word) => {

	const first = word.charAt(0).toUpperCase();

	return `${first}${word.slice(1)}`;

};

export const sleep = async ms => new Promise(resolve => setTimeout(resolve, ms));

export const formatUrl = (source, params) => {
	let url = source;
	params.forEach((item, index) => {
		url = url.replace(new RegExp(`\\{${index}\\}`, 'g'), params[index]);
	});
	return url;
};

export const getCurrentUser = () => {
	try {
		const user = JSON.parse(localStorage.getItem(PROPERTY_USER));
		return user || {};
	} catch (e) {
		return {};
	}
};

export const dispatchError = (error, dispatch) => {
	const { response: { data } } = error;
	let message = '';
	if (data.errors) {
		data.errors.forEach((err) => {
			message += `${err.message}, `;
		});
	}
	dispatch(progressAction(false, false));
	dispatch(snackAction(data.message || message, true, 'error'));
};

export const functionPlaceholder = () => () => {};
