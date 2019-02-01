import ACTION_TYPE from './index';

const snackAction = (message = '', open = false, variant = 'info') => ({
	type: ACTION_TYPE.SHOW_SNACK,
	payload: {
		message,
		open,
		variant
	}
});

export default snackAction;
