import { combineReducers } from 'redux';
import repo from './repo';
import contributors from './contributors';
import statistics from './statistics';

const reducers = {
	repo,
	contributors,
	statistics
};

export default combineReducers(reducers);