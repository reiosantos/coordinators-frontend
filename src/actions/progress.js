import ACTION_TYPE from './index';

const progressAction = (loading = false, success = false) => ({
	type: ACTION_TYPE.LOAD_PROGRESS,
	payload: {
		success,
		loading
	}
});

export default progressAction;
