import axios from 'axios';
import { addToken, dispatchError } from '../utils';
import progressAction from './progress';
import snackAction from './snack';

class Http {
	/**
	 * @param URL
	 * @param requestData
	 * @param dispatch
	 * @param callbackAction
	 * @param method
	 * @returns {Promise<AxiosResponse<any> | never>}
	 */
	static postAndPut = (URL, requestData, dispatch, callbackAction, method = 'POST') => {
		addToken();
		
		let instance;
		
		dispatch(progressAction(true, false));
		
		if (method.trim().toUpperCase() === 'PUT') {
			instance = axios.put(URL, { ...requestData });
		} else {
			instance = axios.post(URL, { ...requestData });
		}
		return instance
			.then(response => response.data)
			.then((response) => {
				dispatch(progressAction(false, true));
				dispatch(snackAction('Changes have been saved', true, 'success'));
				dispatch(callbackAction());
			})
			.catch((error) => {
				dispatchError(error, dispatch);
			});
	};
	
	/**
	 * @param URL
	 * @param requestData
	 * @param dispatch
	 * @param callbackAction
	 * @returns {Promise<AxiosResponse<any>|never>}
	 */
	static post = (
		URL, requestData, dispatch, callbackAction
	) => Http.postAndPut(URL, requestData, dispatch, callbackAction, 'POST');
	
	/**
	 * @param URL
	 * @param requestData
	 * @param dispatch
	 * @param callbackAction
	 * @returns {Promise<AxiosResponse<any>|never>}
	 */
	static put = (
		URL, requestData, dispatch, callbackAction,
	) => Http.postAndPut(URL, requestData, dispatch, callbackAction, 'PUT');
	
	/**
	 * @param URL
	 * @param dispatch
	 * @param callbackAction
	 * @returns {Promise<AxiosResponse<any> | never>}
	 */
	static delete = (URL, dispatch, callbackAction) => {
		addToken();
		dispatch(progressAction(true, false));
		
		return axios.delete(URL)
			.then((response) => {
				dispatch(progressAction(false, true));
				dispatch(snackAction('Record has been successfully deleted', true, 'success'));
				dispatch(callbackAction());
			})
			.catch((error) => {
				dispatchError(error, dispatch);
			});
	};
	
	static get = (URL, dispatch, callbackAction) => {
		addToken();
		dispatch(progressAction(true, false));
		
		return axios.get(URL)
			.then(response => response.data)
			.then((response) => {
				dispatch(progressAction(false, true));
				const { record, records } = response;
				
				dispatch(callbackAction(record || records));
			})
			.catch((error) => {
				dispatchError(error, dispatch);
			});
	}
}

export default Http;
