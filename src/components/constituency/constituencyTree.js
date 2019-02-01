import { brewer as themes } from 'base16';
import PropTypes from 'prop-types';
import React from 'react';
import JSONTree from 'react-json-tree';

const ConstituencyTree = ({ constituencies }) => (
	<JSONTree
		theme={{
			extend: themes, valueLabel: { textDecoration: 'underline' }
		}}
		data={{ constituencies }}
		invertTheme
		hideRoot
	/>
);

ConstituencyTree.propTypes = {
	constituencies: PropTypes.arrayOf(PropTypes.shape()).isRequired
};

export default ConstituencyTree;
