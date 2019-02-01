import ACTION_TYPE from '../../actions';

const state = {
	users: [],
	originalUsers: []
};

const userReducer = (initial = state, action) => {
	const users = action.payload;
	let response;
	switch (action.type) {
		case ACTION_TYPE.FETCH_USERS:
			if (Array.isArray(users)) {
				return { ...initial, users, originalUsers: users };
			}
			return {
				...initial,
				users: [users],
				originalUsers: [users]
			};
		
		case ACTION_TYPE.SEARCH_USERS:
			response = initial.originalUsers.filter(
				record => record.username.toLowerCase().includes(users.toLowerCase())
			);
			return { ...initial, users: response };
		default:
			return initial;
	}
};

export default userReducer;
