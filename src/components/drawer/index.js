import { withStyles } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Icon from '@material-ui/core/Icon/Icon';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import PropTypes from 'prop-types';
import React from 'react';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { Link } from 'react-router-dom';
import drawerStyles from '../../static/styles/drawerStyles';

const navigationMain = [
	{ label: 'Constituencies', icon: 'public', link: '/constituencies' },
	{ label: 'Sub Counties', icon: 'domain', link: '/sub-counties' },
	{ label: 'Parishes', icon: 'location_city', link: '/parishes' },
	{ label: 'Villages', icon: 'my_location', link: '/villages' }
];

const navigationPeople = [
	{ label: 'Representatives', icon: 'people', link: '/representatives' },
	{ label: 'Other Users', icon: 'group_add', link: '/users' }
];

const NavDrawer = (props) => {
	const {
		open, classes, theme, handleDrawerClose, pathname
	} = props;
	return (
		<Drawer
			className={classes.drawer}
			variant="persistent"
			anchor="left"
			open={open}
			classes={{ paper: classes.drawerPaper }}
		>
			<div className={classes.drawerHeader}>
				<img src="https://i.imgur.com/1zccqlp.png" alt="" className={classes.image} />
				<IconButton onClick={handleDrawerClose}>
					{theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
				</IconButton>
			</div>
			<Divider />
			<List>
				{navigationMain.map(menu => (
					<ListItem
						className={pathname === menu.link ? 'active' : ''}
						button
						key={menu.label}
						component={Link}
						to={menu.link}
						replace
					>
						<Icon>{menu.icon}</Icon>
						<ListItemText primary={menu.label} />
					</ListItem>
				))}
			</List>
			<Divider />
			<List>
				{navigationPeople.map(menu => (
					<ListItem
						className={pathname === menu.link ? 'active' : ''}
						button
						key={menu.label}
						component={Link}
						to={menu.link}
						replace
					>
						<Icon>{menu.icon}</Icon>
						<ListItemText primary={menu.label} />
					</ListItem>
				))}
			</List>
		</Drawer>
	);
};

NavDrawer.propTypes = {
	classes: PropTypes.shape().isRequired,
	pathname: PropTypes.string.isRequired,
	theme: PropTypes.shape().isRequired,
	handleDrawerClose: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired
};

export default withStyles(drawerStyles, { withTheme: true })(NavDrawer);
