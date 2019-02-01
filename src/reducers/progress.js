import ACTION_TYPE from '../actions';

const init = { loading: false, success: false };

const progressReducer = (initial = init, action) => {
	switch (action.type) {
		case ACTION_TYPE.LOAD_PROGRESS:
			return {
				...initial,
				...action.payload
			};
		default:
			return initial;
	}
};

export default progressReducer;
