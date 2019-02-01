import * as PropTypes from 'prop-types';
import React from 'react';
import TableHead from '@material-ui/core/TableHead/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CustomCell from './customCell';

const Header = ({ headers = [], isEditing }) => (
	<TableHead>
		<TableRow>
			{ headers.map(
				(name, index) => <CustomCell key={`index_${2 * index}_1`}>{name}</CustomCell>
			)}
			{
				isEditing ? <CustomCell>Action</CustomCell> : null
			}
		</TableRow>
	</TableHead>
);

Header.propTypes = {
	headers: PropTypes.arrayOf(PropTypes.string).isRequired,
	isEditing: PropTypes.bool.isRequired
};

export default Header;
