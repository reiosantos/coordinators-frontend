import ACTION_TYPE from '..';
import { API } from '../../constants';
import Http from '../httpWrapper';

export const fetchVillageActionCreator = data => ({
	type: ACTION_TYPE.FETCH_VILLAGE,
	payload: data
});

export const searchVillages = value => ({
	type: ACTION_TYPE.SEARCH_VILLAGE,
	payload: value
});

export const fetchVillageAction = (
	URL = API.POST_GET_VILLAGES_URL
) => dispatch => Http.get(URL, dispatch, fetchVillageActionCreator);

export const addVillageAction = (
	requestData, URL, method = 'POST'
) => dispatch => Http.postAndPut(URL, requestData, dispatch, fetchVillageAction, method);

export const deleteVillageAction =
		URL => dispatch => Http.delete(URL, dispatch, fetchVillageAction);
