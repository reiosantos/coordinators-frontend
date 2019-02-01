import ACTION_TYPE from '../actions';

const snack = {
	message: '',
	open: false,
	variant: 'info'
};

const snackReducer = (initial = snack, action) => {
	switch (action.type) {
		case ACTION_TYPE.SHOW_SNACK:
			return {
				...initial,
				...action.payload
			};
		default:
			return initial;
	}
};

export default snackReducer;
