import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Switch from '@material-ui/core/Switch';
import Edit from '@material-ui/icons/Edit';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';

const UserForm = (
	{
		errors, classes, switchToggle, handleSwitch, formHasError, onChange, onSubmit,
		username, contact, password, isSuperUser, isAdmin, handleClickShowPassword, showPassword
	}
) => (
	<Paper className={classes.paper}>
		<Avatar className={classes.avatar}><Edit /></Avatar>
		<Typography component="h1" variant="h5">Add / Edit</Typography>
		
		<FormControlLabel
			color="primary"
			control={(
				<Switch
					checked={switchToggle.checked}
					onChange={handleSwitch}
					value={switchToggle.value}
				/>
			)}
			label={switchToggle.label}
		/>
		
		<form className={classes.form} onSubmit={onSubmit}>
			
			<FormControl margin="normal" required fullWidth error={!!errors.username}>
				<InputLabel htmlFor="username">Username</InputLabel>
				<Input
					value={username}
					onChange={onChange('username')}
					id="username"
					name="username"
					autoComplete="username"
					autoFocus
				/>
				<FormHelperText error={!!errors.username}>
					{errors.username}
				</FormHelperText>
			</FormControl>
			
			<FormControl margin="normal" required fullWidth error={!!errors.contact}>
				<InputLabel htmlFor="contact">Contact</InputLabel>
				<Input
					value={contact}
					onChange={onChange('contact')}
					id="contact"
					name="contact"
					autoComplete="contact"
					autoFocus
				/>
				<FormHelperText error={!!errors.contact}>
					{errors.contact}
				</FormHelperText>
			</FormControl>
			
			<FormControl margin="normal" fullWidth error={!!errors.password}>
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
			
			<FormControl component="fieldset">
				<FormLabel component="legend">Privileges</FormLabel>
				<FormGroup>
					<FormControlLabel
						control={
							<Checkbox checked={isAdmin} onChange={onChange('isAdmin')} value="isAdmin" />
						}
						label="Is Admin"
					/>
					<FormControlLabel
						control={
							<Checkbox checked={isSuperUser} onChange={onChange('isSuperUser')} value="isSuperUser" />
						}
						label="Is Super User"
					/>
				</FormGroup>
			</FormControl>
			
			<Button
				disabled={formHasError()}
				type="submit"
				fullWidth
				variant="contained"
				color="primary"
				className={classes.submit}
			>
				<span>
					<i className="fa fa-plus-circle" />
					{'create'}
				</span>
			</Button>
		</form>
	</Paper>
);

UserForm.propTypes = {
	errors: PropTypes.shape().isRequired,
	classes: PropTypes.shape().isRequired,
	switchToggle: PropTypes.shape().isRequired,
	formHasError: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
	handleSwitch: PropTypes.func.isRequired,
	handleClickShowPassword: PropTypes.func.isRequired,
	
	username: PropTypes.string.isRequired,
	contact: PropTypes.string.isRequired,
	password: PropTypes.string.isRequired,
	isSuperUser: PropTypes.bool.isRequired,
	isAdmin: PropTypes.bool.isRequired,
	showPassword: PropTypes.bool.isRequired
};

export default UserForm;
