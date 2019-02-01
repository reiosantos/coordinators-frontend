import ACTION_TYPE from '../../actions';

const state = {
	constituencies: [],
	originalConstituencies: []
};

const constituencyReducer = (initial = state, action) => {
	const constituencies = action.payload;
	let response;
	switch (action.type) {
		case ACTION_TYPE.FETCH_CONSTITUENCY:
			if (Array.isArray(constituencies)) {
				return { ...initial, constituencies, originalConstituencies: constituencies };
			}
			return {
				...initial,
				constituencies: [constituencies],
				originalConstituencies: [constituencies]
			};
		
		case ACTION_TYPE.SEARCH_CONSTITUENCY:
			response = initial.originalConstituencies.filter(
				record => record.constituencyName.toLowerCase().includes(constituencies.toLowerCase())
			);
			return { ...initial, constituencies: response };
		default:
			return initial;
	}
};

export default constituencyReducer;
