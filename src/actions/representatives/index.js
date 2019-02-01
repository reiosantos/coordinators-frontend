import ACTION_TYPE from '..';
import { API } from '../../constants';
import Http from '../httpWrapper';

export const fetchRepresentativeActionCreator = data => ({
	type: ACTION_TYPE.FETCH_REPRESENTATIVE,
	payload: data
});

export const searchRepresentatives = value => ({
	type: ACTION_TYPE.SEARCH_REPRESENTATIVE,
	payload: value
});

export const fetchRepresentativeAction = (
	URL = API.POST_GET_REPRESENTATIVES_URL
) => dispatch => Http.get(URL, dispatch, fetchRepresentativeActionCreator);

export const addRepresentativeAction = (
	requestData, URL, method = 'POST'
) => dispatch => Http.postAndPut(URL, requestData, dispatch, fetchRepresentativeAction, method);

export const deleteRepresentativeAction =
		URL => dispatch => Http.delete(URL, dispatch, fetchRepresentativeAction);
