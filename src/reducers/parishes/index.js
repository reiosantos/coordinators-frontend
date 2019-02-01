import ACTION_TYPE from '../../actions';

const state = {
	parishes: [],
	originalParishes: []
};

const parishReducer = (initial = state, action) => {
	const parishes = action.payload;
	let response;
	switch (action.type) {
		case ACTION_TYPE.FETCH_PARISH:
			if (Array.isArray(parishes)) {
				return { ...initial, parishes, originalParishes: parishes };
			}
			return {
				...initial,
				parishes: [parishes],
				originalParishes: [parishes]
			};
		
		case ACTION_TYPE.SEARCH_PARISH:
			response = initial.originalParishes.filter(
				record => record.parishName.toLowerCase().includes(parishes.toLowerCase())
			);
			return { ...initial, parishes: response };
		default:
			return initial;
	}
};

export default parishReducer;
