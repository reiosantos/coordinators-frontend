import ACTION_TYPE from '../../actions';

const state = {
	villages: [],
	originalVillages: []
};

const villageReducer = (initial = state, action) => {
	const villages = action.payload;
	let response;
	switch (action.type) {
		case ACTION_TYPE.FETCH_VILLAGE:
			if (Array.isArray(villages)) {
				return { ...initial, villages, originalVillages: villages };
			}
			return {
				...initial,
				villages: [villages],
				originalVillages: [villages]
			};
		
		case ACTION_TYPE.SEARCH_VILLAGE:
			response = initial.originalVillages.filter(
				record => record.villageName.toLowerCase().includes(villages.toLowerCase())
			);
			return { ...initial, villages: response };
		default:
			return initial;
	}
};

export default villageReducer;
