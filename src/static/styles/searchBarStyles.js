const searchBarStyles = theme => ({
	root: {
		height: 48,
		display: 'flex',
		justifyContent: 'space-between'
	},
	iconButton: {
		opacity: 0.54,
		transform: 'scale(1, 1)',
		transition: 'transform 200ms cubic-bezier(0.4, 0.0, 0.2, 1)'
	},
	iconButtonHidden: {
		transform: 'scale(0, 0)',
		'& > $icon': {
			opacity: 0
		}
	},
	iconButtonDisabled: {
		opacity: 0.38
	},
	searchIconButton: {
		marginRight: -48
	},
	icon: {
		opacity: 1,
		color: `${theme.palette.primary.main} !important`,
		transition: 'opacity 200ms cubic-bezier(0.4, 0.0, 0.2, 1)'
	},
	input: {
		width: '100%'
	},
	searchContainer: {
		margin: 'auto 16px',
		width: 'calc(100% - 48px - 32px)' // 48px button + 32px margin
	}
});

export default searchBarStyles;
