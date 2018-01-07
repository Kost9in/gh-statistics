import actionNames from 'utils/constants/actions';

const initialState = {
	url: '',
	owner: '',
	repo: ''
};

export default (state = initialState, action) => {
	switch (action.type) {
		case actionNames.setRepo:
			return Object.assign({}, state, action.data);
		default:
			return state;
	}
};