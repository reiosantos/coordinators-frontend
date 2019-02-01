import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import { withStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import AcUnit from '@material-ui/icons/AcUnit';
import List from '@material-ui/icons/List';
import tabbedPageStyles from '../../../static/styles/tabbedPageStyles';
import TabContainer from './tabContainer';

class TabbedPage extends React.Component {
	state = {
		value: 0
	};

	handleChange = (event, value) => {
		this.setState({ value });
	};

	handleChangeIndex = (index) => {
		this.setState({ value: index });
	};

	render() {
		const {
			classes, theme, tabularComponent: LeftComponent, treeComponent: RightComponent
		} = this.props;
		const { value } = this.state;
		return (
			<div className={classes.root}>
				<AppBar position="static" color="default">
					<Tabs
						value={value}
						onChange={this.handleChange}
						indicatorColor="primary"
						textColor="primary"
						variant="fullWidth"
					>
						<Tab icon={<List />} label="Tabular View" />
						<Tab icon={<AcUnit />} label="Tree View" />
					</Tabs>
				</AppBar>
				<SwipeableViews
					axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
					index={value}
					onChangeIndex={this.handleChangeIndex}
				>
					<TabContainer dir={theme.direction}>
						<LeftComponent />
					</TabContainer>

					<TabContainer dir={theme.direction}>
						<RightComponent />
					</TabContainer>
				</SwipeableViews>
			</div>
		);
	}
}

TabbedPage.propTypes = {
	classes: PropTypes.shape().isRequired,
	theme: PropTypes.shape().isRequired,
	tabularComponent: PropTypes.any.isRequired,
	treeComponent: PropTypes.any.isRequired
};

export default withStyles(tabbedPageStyles, { withTheme: true })(TabbedPage);
