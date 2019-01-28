import Hidden from '@material-ui/core/Hidden/Hidden';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button/Button';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import navBarStyles from '../../static/styles/navbarStyles';

const NavBar = ({ classes, user }) => (
	<div className={classes.root}>
		<AppBar position="static">
			<Toolbar>
				<Hidden smDown>
					<IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
						<i className="fa fa-car fa-2x" />
					</IconButton>
					<Typography variant="h4" color="inherit" className={classes.grow}>
						<span>Ride my way</span>
					</Typography>
				</Hidden>
				<Button color="inherit" component={Link} to="/" replace>
					<i className="fa fa-home" />
					<span>Home</span>
				</Button>
				<Button color="inherit" component={Link} to="/logout" replace>
					<i className="fa fa-sign-out-alt " />
					<span>{`Logout (${user.username})`}</span>
				</Button>
				<IconButton className={classes.menuButton} color="inherit" aria-label="Menu" />
			</Toolbar>
		</AppBar>
	</div>
);

NavBar.propTypes = {
	classes: PropTypes.shape().isRequired,
	user: PropTypes.shape().isRequired
};

const mapStateToProps = state => ({ ...state, user: state.authReducer.user });

export default connect(mapStateToProps)(withStyles(navBarStyles)(NavBar));
