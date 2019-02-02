const constituencyStyles = theme => ({
	root: {
		flexGrow: 1
	},
	paper: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
		maxHeight: '100vh',
		overflowY: 'auto'
	},
	avatar: {
		margin: theme.spacing.unit
	},
	submit: {
		marginTop: theme.spacing.unit * 3
	},
	form: {
		width: '100%'
	},
	json: {
		display: 'flex',
		justifyContent: 'flex-start'
	},
	instructions: {
		marginTop: theme.spacing.unit,
		marginBottom: theme.spacing.unit
	}
});

export default constituencyStyles;
