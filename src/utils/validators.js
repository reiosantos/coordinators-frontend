import moment from 'moment';

export const validateUsername = username => (!!username && username.length > 2
	? ''
	: 'This field should be at-least 3 characters and above');

export const validatePassword = password => (password.match(/^(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,15})$/)
	? ''
	: 'Password should contain at-least one letter and one digit. It should be at-least 6 characters long');

export const validatePhoneNumber = phone => (phone.match(/^\d{10,13}$/)
	? ''
	: 'Allowed format is (07********) with at-least 10 but not more that 13 digits');

export const validateEmail = email => (email.match(/^[A-Za-z0-9.+_-]{2,}@[A-Za-z0-9._-]{2,}\.[a-zA-Z]{2,}$/)
	? ''
	: `The email '${email}', is not valid. eg: example@site.com`);

export const validateDateOfBirth = (date) => {
	const dat = new Date(date);
	const format = moment(dat).format('YYYY-MM-DD');
	return format.match(/^\d{4}-\d{2}-\d{2}$/) ? '' : 'Invalid date supplied';
};
