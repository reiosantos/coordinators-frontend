import { brewer as themes } from 'base16';
import PropTypes from 'prop-types';
import React from 'react';
import JSONTree from 'react-json-tree';

const DisplayTree = ({ data }) => (
	<JSONTree
		theme={{
			extend: themes, valueLabel: { textDecoration: 'underline' }
		}}
		data={{ data }}
		invertTheme
		hideRoot
	/>
);

DisplayTree.propTypes = {
	data: PropTypes.arrayOf(PropTypes.shape()).isRequired
};

export default DisplayTree;
