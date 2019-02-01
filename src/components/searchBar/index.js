import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';
import { grey } from '@material-ui/core/colors';
import withStyles from '@material-ui/core/styles/withStyles';
import classNames from 'classnames';
import searchBarStyles from '../../static/styles/searchBarStyles';

/**
 * Material design search bar
 * @see [Search patterns](https://material.io/guidelines/patterns/search.html)
 */
class SearchBar extends Component {
	constructor(props) {
		super(props);
		const { value } = this.props;
		this.state = {
			value,
			focus: false,
			active: false
		};
	}
	
	componentWillReceiveProps(nextProps, nextContext) {
		const { value } = this.props;
		if (value !== nextProps.value) {
			this.setState(prevState => ({ ...prevState, value: nextProps.value }));
		}
	}
	
	handleInput = (e) => {
		this.setState({ value: e.target.value });
	};
	
	handleKeyUp = (e) => {
		if (e.charCode === 13 || e.key === 'Enter') {
			this.handleRequestSearch();
		}
	};
	
	handleRequestSearch = () => {
		this.search();
	};
	
	search = () => {
		const { onRequestSearch } = this.props;
		const { value } = this.state;
		if (onRequestSearch) {
			onRequestSearch(value);
		}
	};
	
	render() {
		const { value } = this.state;
		const {
			className, classes, closeIcon, disabled, searchIcon, style, placeholder
		} = this.props;
		
		return (
			<Paper className={classNames(classes.root, className)} style={style}>
				<div className={classes.searchContainer}>
					<Input
						placeholder={placeholder}
						value={value}
						onChange={this.handleInput}
						onKeyUp={this.handleKeyUp}
						fullWidth
						className={classes.input}
						disableUnderline
						disabled={disabled}
					/>
				</div>
				<IconButton
					onClick={this.handleRequestSearch}
					classes={{
						root: classNames(classes.iconButton, classes.searchIconButton, {}),
						disabled: classes.iconButtonDisabled
					}}
					disabled={disabled}
				>
					{React.cloneElement(searchIcon, { classes: { root: classes.icon } })}
				</IconButton>
				<IconButton
					classes={{
						root: classNames(classes.iconButton, { [classes.iconButtonHidden]: true }),
						disabled: classes.iconButtonDisabled
					}}
				>
					{React.cloneElement(closeIcon, { classes: { root: classes.icon } })}
				</IconButton>
			</Paper>
		);
	}
}

SearchBar.defaultProps = {
	className: '',
	closeIcon: <ClearIcon style={{ color: grey[500] }} />,
	disabled: false,
	placeholder: 'Search',
	searchIcon: <SearchIcon style={{ color: grey[500] }} />,
	style: null,
	value: ''
};

SearchBar.propTypes = {
	classes: PropTypes.shape().isRequired,
	className: PropTypes.string,
	closeIcon: PropTypes.node,
	disabled: PropTypes.bool,
	onRequestSearch: PropTypes.func.isRequired,
	placeholder: PropTypes.string,
	searchIcon: PropTypes.node,
	style: PropTypes.shape(),
	value: PropTypes.string
};

export default withStyles(searchBarStyles)(SearchBar);
