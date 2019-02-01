
const mainTableStyles = theme => ({
	root: {
		width: '100%',
		marginTop: theme.spacing.unit * 3
	},
	table: {
		minWidth: 500
	},
	tableWrapper: {
		overflowX: 'auto'
	},
	category: {
		backgroundColor: theme.palette.grey[300]
	},
	taken: {
		color: theme.palette.primary.main,
		fontWeight: 'bolder'
	},
	grid: {
		marginBottom: theme.spacing.unit
	}
});

export default mainTableStyles;
