import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

const StepTwoForm = (
	{
		errors, classes, formHasError, onChange,
		firstName, lastName, contact, email, dateOfBirth
	}
) => (
	<Fragment>
		<Grid container spacing={16}>
			<Grid item xs={12} sm={12} md={6} lg={6}>
				<FormControl margin="normal" required fullWidth error={!!errors.firstName}>
					<InputLabel htmlFor="villageName">First Name</InputLabel>
					<Input
						value={firstName}
						onChange={onChange('firstName')}
						id="firstName"
						name="firstName"
						autoComplete="firstName"
						autoFocus
					/>
					<FormHelperText error={!!errors.firstName}>
						{errors.firstName}
					</FormHelperText>
				</FormControl>
			</Grid>
			<Grid item xs={12} sm={12} md={6} lg={6}>
				<FormControl margin="normal" required fullWidth error={!!errors.lastName}>
					<InputLabel htmlFor="lastName">Last Name</InputLabel>
					<Input
						value={lastName}
						onChange={onChange('lastName')}
						id="lastName"
						name="lastName"
						autoComplete="lastName"
						autoFocus
					/>
					<FormHelperText error={!!errors.lastName}>
						{errors.lastName}
					</FormHelperText>
				</FormControl>
			</Grid>
		</Grid>
		<FormControl margin="normal" required fullWidth error={!!errors.contact}>
			<InputLabel htmlFor="contact">Phone Number</InputLabel>
			<Input
				type="tel"
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
		<FormControl margin="normal" required fullWidth error={!!errors.email}>
			<InputLabel htmlFor="email">Email</InputLabel>
			<Input
				value={email}
				type="email"
				onChange={onChange('email')}
				id="email"
				name="email"
				autoComplete="email"
				autoFocus
			/>
			<FormHelperText error={!!errors.email}>
				{errors.email}
			</FormHelperText>
		</FormControl>
		<FormControl margin="normal" required fullWidth error={!!errors.dateOfBirth}>
			<InputLabel htmlFor="dateOfBirth">Date Of Birth</InputLabel>
			<Input
				value={dateOfBirth}
				type="date"
				onChange={onChange('dateOfBirth')}
				id="dateOfBirth"
				name="dateOfBirth"
				autoComplete="dateOfBirth"
				autoFocus
			/>
			<FormHelperText error={!!errors.dateOfBirth}>
				{errors.dateOfBirth}
			</FormHelperText>
		</FormControl>
	</Fragment>
);

StepTwoForm.propTypes = {
	errors: PropTypes.shape().isRequired,
	classes: PropTypes.shape().isRequired,
	
	formHasError: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired,
	
	firstName: PropTypes.string.isRequired,
	lastName: PropTypes.string.isRequired,
	contact: PropTypes.string.isRequired,
	email: PropTypes.string.isRequired,
	dateOfBirth: PropTypes.string.isRequired
};

export default StepTwoForm;
