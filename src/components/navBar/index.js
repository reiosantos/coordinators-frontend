import Hidden from '@material-ui/core/Hidden/Hidden';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import navBarStyles from '../../static/styles/navbarStyles';
import NavDrawer from '../drawer';

class NavBar extends React.Component {
	
	state = {
		open: false
	};
	
	handleDrawerOpen = () => {
		this.setState({ open: true });
	};
	
	handleDrawerClose = () => {
		this.setState({ open: false });
	};
	
	render() {
		const { classes, user, component: Component } = this.props;
		const { open } = this.state;
		
		return (
			<div className={classes.root}>
				<AppBar
					position="fixed"
					className={classNames(classes.appBar, { [classes.appBarShift]: open })}
				>
					<Toolbar disableGutters={!open}>
						<IconButton
							color="inherit"
							aria-label="Open drawer"
							onClick={this.handleDrawerOpen}
							className={classNames(classes.menuButton, open && classes.hide)}
						>
							<MenuIcon />
						</IconButton>
						<Hidden smDown>
							<Typography variant="h4" color="inherit" className={classes.grow} noWrap>
								<span>Coordinators</span>
							</Typography>
							<Button color="inherit" component={Link} to="/" replace>
								<i className="fa fa-home" />
								<span>Home</span>
							</Button>
						</Hidden>
						<Button color="inherit" component={Link} to="/logout" replace>
							<i className="fa fa-sign-out-alt " />
							<span>{`Logout (${user.username})`}</span>
						</Button>
						<IconButton
							className={classes.menuButton}
							color="inherit"
							aria-label="Menu"
						/>
					</Toolbar>
				</AppBar>
				
				<NavDrawer handleDrawerClose={this.handleDrawerClose} open={open} />
				
				<main className={classNames(classes.content, { [classes.contentShift]: open })}>
					<div className={classes.drawerHeader} />
					
					<Component />
				</main>
			</div>
		);
	}
}

NavBar.propTypes = {
	classes: PropTypes.shape().isRequired,
	component: PropTypes.oneOfType([PropTypes.func, React.Component]).isRequired,
	user: PropTypes.shape().isRequired
};

const mapStateToProps = state => ({ ...state, user: state.authReducer.user });

export default connect(mapStateToProps)(withStyles(navBarStyles)(NavBar));
