
export const AUTH_TOKEN = 'auth_token';
export const PROPERTY_USER = 'user';

export const BASE_URL = `${process.env.REACT_APP_BASE_URL}/api/v1`;

export const API = {
	LOGIN_URL: `${BASE_URL}/login`,
	LOGOUT_URL: `${BASE_URL}/logout`,
	POST_GET_REPRESENTATIVES_URL: `${BASE_URL}/representatives`,
	PUT_DELETE_GET_REPRESENTATIVES_URL: `${BASE_URL}/representatives/{0}`,
	POST_GET_CONSTITUENCIES_URL: `${BASE_URL}/constituencies`,
	PUT_DELETE_GET_CONSTITUENCIES_URL: `${BASE_URL}/constituencies/{0}`,
	POST_GET_SUB_COUNTY_URL: `${BASE_URL}/sub-counties`,
	PUT_DELETE_GET_SUB_COUNTY_URL: `${BASE_URL}/sub-counties/{0}`,
	POST_GET_PARISHES_URL: `${BASE_URL}/parishes`,
	PUT_DELETE_GET_PARISHES_URL: `${BASE_URL}/parishes/{0}`,
	POST_GET_VILLAGES_URL: `${BASE_URL}/villages`,
	PUT_DELETE_GET_VILLAGES_URL: `${BASE_URL}/villages/{0}`,
	POST_GET_USERS_URL: `${BASE_URL}/users`,
	PUT_DELETE_GET_USERS_URL: `${BASE_URL}/users/{0}`
};
