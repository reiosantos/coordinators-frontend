import React from 'react';
import PropTypes from 'prop-types';
import TableBody from '@material-ui/core/TableBody';
import Row from './row';

const Body = ({
	rows, page, rowsPerPage, onClickDelete, onClickEdit, classes, onDoubleClick, isEditing
}) => (
	<TableBody>
		{rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => (
			!row
				? null
				: (
					<Row
						isEditing={isEditing}
						key={row[1]}
						onClickDelete={onClickDelete}
						onClickEdit={onClickEdit}
						row={row}
						onDoubleClick={onDoubleClick}
						classes={classes}
					/>
				)
		))}
	</TableBody>
);

Body.propTypes = {
	classes: PropTypes.shape().isRequired,
	page: PropTypes.number.isRequired,
	rowsPerPage: PropTypes.number.isRequired,
	isEditing: PropTypes.bool.isRequired,
	rows: PropTypes.arrayOf(PropTypes.array).isRequired,
	onClickDelete: PropTypes.func.isRequired,
	onClickEdit: PropTypes.func.isRequired,
	onDoubleClick: PropTypes.func.isRequired
};

export default Body;
