import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import paginationViewStyles from '../../static/styles/paginationViewStyles';

const PaginationView = (
	{
		classes, count, page, rowsPerPage, theme, handleBackButtonClick, handleFirstPageButtonClick,
		handleNextButtonClick, handleLastPageButtonClick
	}
) => (
	<div className={classes.root}>
		<IconButton
			onClick={handleFirstPageButtonClick}
			disabled={page === 0}
			aria-label="First Page"
		>
			{theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
		</IconButton>
		<IconButton
			onClick={handleBackButtonClick}
			disabled={page === 0}
			aria-label="Previous Page"
		>
			{theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
		</IconButton>
		<IconButton
			onClick={handleNextButtonClick}
			disabled={page >= Math.ceil(count / rowsPerPage) - 1}
			aria-label="Next Page"
		>
			{theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
		</IconButton>
		<IconButton
			onClick={handleLastPageButtonClick}
			disabled={page >= Math.ceil(count / rowsPerPage) - 1}
			aria-label="Last Page"
		>
			{theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
		</IconButton>
	</div>
);

PaginationView.propTypes = {
	classes: PropTypes.shape().isRequired,
	count: PropTypes.number.isRequired,
	page: PropTypes.number.isRequired,
	rowsPerPage: PropTypes.number.isRequired,
	theme: PropTypes.shape().isRequired,
	handleBackButtonClick: PropTypes.func.isRequired,
	handleFirstPageButtonClick: PropTypes.func.isRequired,
	handleNextButtonClick: PropTypes.func.isRequired,
	handleLastPageButtonClick: PropTypes.func.isRequired
};

export default withStyles(paginationViewStyles, { withTheme: true })(PaginationView);
