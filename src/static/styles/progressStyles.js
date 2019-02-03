import green from '@material-ui/core/colors/green';

const progressStyles = theme => ({
	root: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		zIndex: 2000,
		backgroundColor: 'rgba(105, 105, 105, 0.2)'
	},
	wrapper: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		margin: 'auto',
		top: 0,
		bottom: 0,
		right: 0,
		left: 0
	},
	buttonSuccess: {
		backgroundColor: green[500],
		'&:hover': {
			backgroundColor: green[700]
		}
	},
	fabProgress: {
		color: '#FFF'
	},
	buttonProgress: {
		margin: 'auto',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		position: 'absolute'
	}
});

export default progressStyles;
