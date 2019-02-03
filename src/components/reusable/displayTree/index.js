import { brewer as themes } from 'base16';
import PropTypes from 'prop-types';
import React from 'react';
import JSONTree from 'react-json-tree';

const flattenData = (passedData) => {
	const newArray = [];
	if (Array.isArray(passedData)) {
		for (let i = 0; i < passedData.length; i += 1) {
			const obj = passedData[i];
			if (typeof obj === 'object' && !Array.isArray(obj)) {
				const keys = Object.keys(obj);
				keys.forEach((element) => {
					if (Array.isArray(obj[element])) {
						Object.assign(obj, {
							[element]: flattenData(obj[element])
						});
					}
					if (obj[element] && typeof obj[element] === 'object') {
						const value = { };
						const names = Object.keys(obj[element]).filter(el => el.endsWith('Name'));
						names.forEach((name) => {
							value[name] = obj[element][name];
						});
						
						if (!Array.isArray(obj[element])) {
							Object.assign(obj, {
								[element]: value
							});
						}
					}
					if (!Array.isArray(obj[element]) &&
						!element.endsWith('Name') &&
						!element.match(/^[A-Z]/)) {
						if (element.endsWith('Id')) {
							delete obj[element];
						}
					}
				});
				delete obj.createdAt;
				delete obj.updatedAt;
				newArray.push(obj);
			}
		}
	}
	return newArray;
};

const makeFlat = (resp) => {
	const flat = [];
	resp.forEach((value) => {
		const record = {};
		const keys = Object.keys(value);
		keys.forEach((key) => {
			if (Array.isArray(value[key])) {
				record[key] = Array.prototype.concat.apply([], value[key].map(v => Object.values(v)));
			} else {
				record[key] = value[key];
			}
		});
		flat.push(record);
	});
	return flat;
};

const flattenArray = (toFlat) => {
	const newData = toFlat.slice(0);
	const resp = flattenData(newData);
	return makeFlat(resp);
};

const DisplayTree = ({ data }) => (
	<JSONTree
		theme={{
			extend: themes, valueLabel: { textDecoration: 'underline' }
		}}
		data={{ data: flattenArray(data) }}
		invertTheme
		hideRoot
	/>
);

DisplayTree.propTypes = {
	data: PropTypes.arrayOf(PropTypes.shape()).isRequired
};

export default DisplayTree;
