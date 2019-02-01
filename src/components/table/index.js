import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import mainTableStyles from '../../static/styles/mainTableStyles';
import { functionPlaceholder } from '../../utils';
import Pagination from '../pagination';
import Body from './body';
import Header from './header';
import HeaderText from './headerText';

class MainTable extends Component {
	
	constructor(props) {
		super(props);
		this.state = { page: 0, rowsPerPage: 10 };
	}
	
	handleChangePage = (event, page) => {
		this.setState({ page });
	};
	
	handleChangeRowsPerPage = (event) => {
		this.setState({ rowsPerPage: event.target.value });
	};
	
	render() {
		const {
			classes, rows, onClickDelete, title, onClickEdit, headers, onDoubleClick, isEditing
		} = this.props;
		const { page, rowsPerPage } = this.state;
		
		return (
			<div className={classes.tableWrapper}>
				<HeaderText title={title} classes={classes} />
				<Table className={classes.table}>
					<Header headers={headers} isEditing={isEditing} />
					<Body
						isEditing={isEditing}
						classes={classes}
						rows={rows}
						onDoubleClick={onDoubleClick}
						onClickDelete={onClickDelete}
						onClickEdit={onClickEdit}
						rowsPerPage={rowsPerPage}
						page={page}
					/>
					<TableFooter>
						<TableRow>
							<TablePagination
								count={rows.length}
								rowsPerPage={rowsPerPage}
								page={page}
								onChangePage={this.handleChangePage}
								onChangeRowsPerPage={this.handleChangeRowsPerPage}
								ActionsComponent={Pagination}
							/>
						</TableRow>
					</TableFooter>
				</Table>
			</div>
		);
	}
}

MainTable.propTypes = {
	classes: PropTypes.shape().isRequired,
	title: PropTypes.string.isRequired,
	isEditing: PropTypes.bool.isRequired,
	rows: PropTypes.arrayOf(PropTypes.array).isRequired,
	headers: PropTypes.arrayOf(PropTypes.string).isRequired,
	onClickDelete: PropTypes.func.isRequired,
	onClickEdit: PropTypes.func.isRequired,
	onDoubleClick: PropTypes.func

};
MainTable.defaultProps = {
	onDoubleClick: functionPlaceholder
};

export default withStyles(mainTableStyles)(MainTable);
