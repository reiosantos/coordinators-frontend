import ACTION_TYPE from '..';
import { API } from '../../constants';
import Http from '../httpWrapper';

export const fetchParishActionCreator = data => ({
	type: ACTION_TYPE.FETCH_PARISH,
	payload: data
});

export const searchParishes = value => ({
	type: ACTION_TYPE.SEARCH_PARISH,
	payload: value
});

export const fetchParishAction = (
	URL = API.POST_GET_PARISHES_URL
) => dispatch => Http.get(URL, dispatch, fetchParishActionCreator);

export const addParishAction = (
	requestData, URL, method = 'POST'
) => dispatch => Http.postAndPut(URL, requestData, dispatch, fetchParishAction, method);

export const deleteParishAction =
		URL => dispatch => Http.delete(URL, dispatch, fetchParishAction);
