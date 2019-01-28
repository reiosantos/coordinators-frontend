export const validateUsername = username => (!!username && username.length > 2
	? ''
	: 'This field should be at-least 3 characters and above');

export const validatePassword = password => (password.match(/(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,15})$/)
	? ''
	: 'Password should contain at-least one letter and one digit. It should be at-least 6 characters long');

export const validatePhoneNumber = phone => (phone.match(/\d{10,13}/)
	? ''
	: 'Allowed format is (07********) with at-least 10 but not more that 13 digits');
