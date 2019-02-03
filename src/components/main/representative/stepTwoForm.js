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
		firstName, lastName, contact, nin
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
		<FormControl margin="normal" required fullWidth error={!!errors.nin}>
			<InputLabel htmlFor="nin">NIN</InputLabel>
			<Input
				value={nin}
				type="nin"
				onChange={onChange('nin')}
				id="nin"
				name="nin"
				autoComplete="nin"
				autoFocus
			/>
			<FormHelperText error={!!errors.nin}>
				{errors.nin}
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
	nin: PropTypes.string.isRequired
};

export default StepTwoForm;
