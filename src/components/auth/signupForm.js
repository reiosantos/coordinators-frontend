import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText/FormHelperText';
import Icon from '@material-ui/core/Icon/Icon';
import IconButton from '@material-ui/core/IconButton/IconButton';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select/Select';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import AccountIcon from '@material-ui/icons/AccountCircle';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import signupFormStyles from '../../static/styles/signupFormStyles';

const SignUpForm = ({
	classes, onChange, onSubmit, handleSelectChange, selectValue,
	showPassword, password, handleClickShowPassword, errors, formHasError
}) => (
	<React.Fragment>
		<CssBaseline />
		<main className={classes.layout}>
			<Paper className={classes.paper}>
				<Avatar className={classes.avatar}><AccountIcon /></Avatar>
				<Typography component="h1" variant="h5">Create Account</Typography>

				<form className={classes.form} onSubmit={onSubmit}>
					<FormControl margin="normal" required fullWidth error={!!errors.fullNames}>
						<InputLabel htmlFor="fullNames">Full Names</InputLabel>
						<Input id="fullNames" onChange={onChange('fullNames')} name="fullNames" autoComplete="fullNames" autoFocus />
						<FormHelperText error={!!errors.fullNames}>{errors.fullNames}</FormHelperText>
					</FormControl>

					<FormControl className={classes.formControl} margin="normal" required error={!!errors.userType}>
						<InputLabel htmlFor="age-native-simple">User Type</InputLabel>
						<Select native value={selectValue} onChange={handleSelectChange('userType')}>
							<option value="" disabled />
							<option value="driver">Driver</option>
							<option value="passenger">Passenger</option>
						</Select>
						<FormHelperText error={!!errors.userType}>{errors.userType}</FormHelperText>
					</FormControl>

					<FormControl margin="normal" required fullWidth error={!!errors.phoneNumber}>
						<InputLabel htmlFor="phoneNumber">Phone Number</InputLabel>
						<Input
							onChange={onChange('phoneNumber')}
							id="phoneNumber"
							name="phoneNumber"
							autoComplete="phoneNumber"
							autoFocus
							endAdornment={(
								<InputAdornment position="end">
									<IconButton>
										<Icon color="primary">contact_phone</Icon>
									</IconButton>
								</InputAdornment>
							)}
						/>
						<FormHelperText error={!!errors.phoneNumber}>{errors.phoneNumber}</FormHelperText>
					</FormControl>

					<FormControl margin="normal" required fullWidth error={!!errors.username}>
						<InputLabel htmlFor="username">Username</InputLabel>
						<Input onChange={onChange('username')} id="username" name="username" autoComplete="username" autoFocus />
						<FormHelperText error={!!errors.username}>{errors.username}</FormHelperText>
					</FormControl>

					<FormControl className={classes.textField} margin="normal" fullWidth required error={!!errors.password}>
						<InputLabel htmlFor="adornment-password">Password</InputLabel>
						<Input
							id="adornment-password"
							type={showPassword ? 'text' : 'password'}
							value={password}
							onChange={onChange('password')}
							endAdornment={(
								<InputAdornment position="end">
									<IconButton
										color="primary"
										aria-label="Toggle password visibility"
										onClick={handleClickShowPassword}
									>
										{showPassword ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								</InputAdornment>
							)}
						/>
						<FormHelperText error={!!errors.password}>{errors.password}</FormHelperText>
					</FormControl>

					<Button disabled={formHasError()} type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
						<i className="fa fa-user-plus" />
						<span>Sign up</span>
					</Button>
				</form>

				<Button className={classes.typography} component={Link} to="/login" replace>
					<Typography>Already have an account? Login.</Typography>
				</Button>
			</Paper>
		</main>
	</React.Fragment>
);

SignUpForm.propTypes = {
	selectValue: PropTypes.string,
	classes: PropTypes.shape().isRequired,
	onChange: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
	formHasError: PropTypes.func.isRequired,
	handleSelectChange: PropTypes.func.isRequired,
	handleClickShowPassword: PropTypes.func.isRequired,
	showPassword: PropTypes.bool,
	password: PropTypes.string,
	errors: PropTypes.shape()
};

SignUpForm.defaultProps = {
	selectValue: '',
	showPassword: false,
	password: '',
	errors: {}
};

export default withStyles(signupFormStyles)(SignUpForm);
