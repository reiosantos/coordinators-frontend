import ACTION_TYPE from '../../actions';

const state = {
	subCounties: [],
	originalSubCounties: []
};

const subCountyReducer = (initial = state, action) => {
	const subCounties = action.payload;
	let response;
	switch (action.type) {
		case ACTION_TYPE.FETCH_SUB_COUNTY:
			if (Array.isArray(subCounties)) {
				return { ...initial, subCounties, originalSubCounties: subCounties };
			}
			return {
				...initial,
				subCounties: [subCounties],
				originalSubCounties: [subCounties]
			};
		
		case ACTION_TYPE.SEARCH_SUB_COUNTY:
			response = initial.originalSubCounties.filter(
				record => record.subCountyName.toLowerCase().includes(subCounties.toLowerCase())
			);
			return { ...initial, subCounties: response };
		default:
			return initial;
	}
};

export default subCountyReducer;
