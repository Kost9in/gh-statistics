import actionNames from 'utils/constants/actions';

const initialState = {
	loading: false,
	loaded: false,
	data: {},
	error: null
};

export default (state = initialState, action) => {
	switch (action.type) {
		case actionNames.statisticsRequest:
			return Object.assign({}, initialState, { loading: true });
		case actionNames.statisticsSuccess:
			return Object.assign({}, initialState, { loaded: true, data: action.data });
		case actionNames.statisticsFailure:
			return Object.assign({}, initialState, { loaded: true, error: action.data });
		case actionNames.resetStatistics:
			return Object.assign({}, initialState);
		default:
			return state;
	}
};