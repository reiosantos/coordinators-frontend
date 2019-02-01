import ACTION_TYPE from '..';
import { API } from '../../constants';
import Http from '../httpWrapper';

export const fetchSubCountyActionCreator = data => ({
	type: ACTION_TYPE.FETCH_SUB_COUNTY,
	payload: data
});

export const searchSubCounties = value => ({
	type: ACTION_TYPE.SEARCH_SUB_COUNTY,
	payload: value
});

export const fetchSubCountyAction = (
	URL = API.POST_GET_SUB_COUNTY_URL
) => dispatch => Http.get(URL, dispatch, fetchSubCountyActionCreator);

export const addSubCountyAction = (
	requestData, URL, method = 'POST'
) => dispatch => Http.postAndPut(URL, requestData, dispatch, fetchSubCountyAction, method);

export const deleteSubCountyAction =
		URL => dispatch => Http.delete(URL, dispatch, fetchSubCountyAction);
