import ACTION_TYPE from '../../actions';

const state = {
	representatives: [],
	originalRepresentatives: []
};

const representativeReducer = (initial = state, action) => {
	const representatives = action.payload;
	let response;
	switch (action.type) {
		case ACTION_TYPE.FETCH_REPRESENTATIVE:
			if (Array.isArray(representatives)) {
				return { ...initial, representatives, originalRepresentatives: representatives };
			}
			return {
				...initial,
				representatives: [representatives],
				originalRepresentatives: [representatives]
			};
		
		case ACTION_TYPE.SEARCH_REPRESENTATIVE:
			response = initial.originalRepresentatives.filter(
				record => (
					record.firstName.toLowerCase().includes(representatives.toLowerCase()) ||
					record.lastName.toLowerCase().includes(representatives.toLowerCase())
				)
			);
			return { ...initial, representatives: response };
		default:
			return initial;
	}
};

export default representativeReducer;
