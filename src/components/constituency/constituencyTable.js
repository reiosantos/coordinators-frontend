import PropTypes from 'prop-types';
import React from 'react';
import MainTable from '../table';

const ConstituencyTable = (props) => {
	const {
		constituencies, onClickDelete, onClickEdit, headers, isEditing
	} = props;
	return (
		<MainTable
			isEditing={isEditing}
			headers={headers}
			title={`Total: ${constituencies.length}`}
			rows={constituencies}
			onClickDelete={onClickDelete}
			onClickEdit={onClickEdit}
		/>
	);
};

ConstituencyTable.propTypes = {
	headers: PropTypes.arrayOf(PropTypes.string).isRequired,
	constituencies: PropTypes.arrayOf(PropTypes.array).isRequired,
	isEditing: PropTypes.bool.isRequired,
	onClickDelete: PropTypes.func.isRequired,
	onClickEdit: PropTypes.func.isRequired
};

export default ConstituencyTable;
