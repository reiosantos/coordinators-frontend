import React from 'react';
import PropTypes from 'prop-types';
import PaginationView from './paginationView';

class Pagination extends React.Component {

	handleFirstPageButtonClick = (event) => {
		const { onChangePage } = this.props;
		onChangePage(event, 0);
	};

	handleBackButtonClick = (event) => {
		const { onChangePage, page } = this.props;
		onChangePage(event, page - 1);
	};

	handleNextButtonClick = (event) => {
		const { onChangePage, page } = this.props;
		onChangePage(event, page + 1);
	};

	handleLastPageButtonClick = (event) => {
		const { onChangePage, count, rowsPerPage } = this.props;
		onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
	};

	render() {
		return (
			<PaginationView
				handleLastPageButtonClick={this.handleLastPageButtonClick}
				handleNextButtonClick={this.handleNextButtonClick}
				handleBackButtonClick={this.handleBackButtonClick}
				handleFirstPageButtonClick={this.handleFirstPageButtonClick}
				{...this.props}
			/>
		);
	}
}

Pagination.propTypes = {
	count: PropTypes.number.isRequired,
	page: PropTypes.number.isRequired,
	rowsPerPage: PropTypes.number.isRequired,
	onChangePage: PropTypes.func.isRequired
};

export default Pagination;
