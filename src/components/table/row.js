import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid/Grid';
import IconButton from '@material-ui/core/IconButton/IconButton';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import CheckIcon from '@material-ui/icons/Check';
import DeleteIcon from '@material-ui/icons/Delete';

const Row = ({
	row = [], classes, onClickDelete, onClickEdit, onDoubleClick, isEditing
}) => {
	const record = row[0];
	const id = row[1];
	const cells = row.slice(2);
	return (
		<TableRow hover key={id} onDoubleClick={onDoubleClick(id)}>
			{
				cells.map(
					(cell, index) => <TableCell key={`index_${2 * index}_1`}>{ cell }</TableCell>
				)
			}
			{
				isEditing
					? (
						<TableCell>
							<Grid container style={{ display: row.status === 'taken' ? 'none' : '' }}>
								<Grid item sm={6} lg={6} md={6}>
									<IconButton color="primary" onClick={onClickEdit(record)}>
										<CheckIcon titleAccess="Edit" />
									</IconButton>
								</Grid>
								<Grid item sm={6} lg={6} md={6}>
									<IconButton onClick={onClickDelete(id)}>
										<DeleteIcon titleAccess="Delete" />
									</IconButton>
								</Grid>
							</Grid>
						</TableCell>
					) : null
			}
		</TableRow>
	);
};

Row.propTypes = {
	row: PropTypes.array.isRequired,
	isEditing: PropTypes.bool.isRequired,
	classes: PropTypes.shape().isRequired,
	onClickDelete: PropTypes.func.isRequired,
	onClickEdit: PropTypes.func.isRequired,
	onDoubleClick: PropTypes.func.isRequired
};

export default Row;
