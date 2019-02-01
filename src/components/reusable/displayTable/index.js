import PropTypes from 'prop-types';
import React from 'react';
import MainTable from '../table';

const DisplayTable = (props) => {
	const {
		entries, onClickDelete, onClickEdit, headers, isEditing
	} = props;
	return (
		<MainTable
			isEditing={isEditing}
			headers={headers}
			title={`Total: ${entries.length}`}
			rows={entries}
			onClickDelete={onClickDelete}
			onClickEdit={onClickEdit}
		/>
	);
};

DisplayTable.propTypes = {
	headers: PropTypes.arrayOf(PropTypes.string).isRequired,
	entries: PropTypes.arrayOf(PropTypes.array).isRequired,
	isEditing: PropTypes.bool.isRequired,
	onClickDelete: PropTypes.func.isRequired,
	onClickEdit: PropTypes.func.isRequired
};

export default DisplayTable;
