import { combineReducers } from 'redux';
import authReducer from './auth';
import constituencyReducer from './constituencies';
import parishReducer from './parishes';
import progressReducer from './progress';
import representativeReducer from './representatives';
import snackReducer from './snack';
import subCountyReducer from './subCounties';
import userReducer from './users';
import villageReducer from './villages';

const reducers = combineReducers({
	authReducer,
	progressReducer,
	snackReducer,
	constituencyReducer,
	representativeReducer,
	subCountyReducer,
	parishReducer,
	villageReducer,
	userReducer
});

export default reducers;
