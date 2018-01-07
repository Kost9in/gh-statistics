import actionNames from 'utils/constants/actions';

const initialState = {
	loading: false,
	data: {},
	error: null
};

export default (state = initialState, action) => {
	switch (action.type) {
		case actionNames.contributorsRequest:
			return Object.assign({}, initialState, { loading: true });
		case actionNames.contributorsSuccess:
			return Object.assign({}, initialState, { data: action.data });
		case actionNames.contributorsFailure:
			return Object.assign({}, initialState, { error: action.data });
		case actionNames.setSelectedContributor:
			const newData = state.data.map(contributor => {
				contributor.selected = (contributor.login === action.data);
				return contributor;
			});
			return Object.assign({}, state, { data: newData });
		default:
			return state;
	}
};