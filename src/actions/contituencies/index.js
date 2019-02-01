import ACTION_TYPE from '..';
import { API } from '../../constants';
import Http from '../httpWrapper';

export const fetchConstituencyActionCreator = data => ({
	type: ACTION_TYPE.FETCH_CONSTITUENCY,
	payload: data
});

export const searchConstituencies = value => ({
	type: ACTION_TYPE.SEARCH_CONSTITUENCY,
	payload: value
});

export const fetchConstituencyAction = (
	URL = API.POST_GET_CONSTITUENCIES_URL
) => dispatch => Http.get(URL, dispatch, fetchConstituencyActionCreator);

export const addConstituencyAction = (
	requestData, URL, method = 'POST'
) => dispatch => Http.postAndPut(URL, requestData, dispatch, fetchConstituencyAction, method);

export const deleteConstituencyAction =
		URL => dispatch => Http.delete(URL, dispatch, fetchConstituencyAction);
