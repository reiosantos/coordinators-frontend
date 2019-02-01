import ACTION_TYPE from '..';
import { API } from '../../constants';
import Http from '../httpWrapper';

export const fetchUsersActionCreator = data => ({
	type: ACTION_TYPE.FETCH_USERS,
	payload: data
});

export const searchUsers = value => ({
	type: ACTION_TYPE.SEARCH_USERS,
	payload: value
});

export const fetchUsersAction = (
	URL = API.POST_GET_USERS_URL
) => dispatch => Http.get(URL, dispatch, fetchUsersActionCreator);

export const addUsersAction = (
	requestData, URL, method = 'POST'
) => dispatch => Http.postAndPut(URL, requestData, dispatch, fetchUsersAction, method);

export const deleteUsersAction =
		URL => dispatch => Http.delete(URL, dispatch, fetchUsersAction);
