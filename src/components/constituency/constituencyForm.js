import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';
import Edit from '@material-ui/icons/Edit';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';

const ConstituencyForm = (
	{
		errors, classes, constituencyName, representativeId, switchToggle, handleSwitch,
		representatives, formHasError, handleSelectChange, onChange, onSubmit
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
					onChange={handleSwitch('editingToggle')}
					value={switchToggle.value}
				/>
			)}
			label={switchToggle.label}
		/>
		
		<form className={classes.form} onSubmit={onSubmit}>
			
			<FormControl margin="normal" required fullWidth error={!!errors.constituencyName}>
				<InputLabel htmlFor="constituencyName">Constituency Name</InputLabel>
				<Input
					value={constituencyName}
					onChange={onChange('constituencyName')}
					id="constituencyName"
					name="constituencyName"
					autoComplete="constituencyName"
					autoFocus
				/>
				<FormHelperText error={!!errors.constituencyName}>
					{errors.constituencyName}
				</FormHelperText>
			</FormControl>
			
			<FormControl
				margin="normal"
				fullWidth
				className={classes.formControl}
				error={!!errors.representativeId}
			>
				<InputLabel htmlFor="name-error">Representative</InputLabel>
				<Select
					value={representativeId}
					onChange={handleSelectChange}
					name="representativeId"
					input={<Input id="name-error" />}
				>
					<MenuItem value=""><em>None</em></MenuItem>
					{
						representatives.map(
							rep => (
								<MenuItem key={rep.id} value={rep.id}>
									{`${rep.firstName} ${rep.lastName}`}
								</MenuItem>
							)
						)
					}
				</Select>
				<FormHelperText error={!!errors.representativeId}>
					{errors.representativeId}
				</FormHelperText>
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

ConstituencyForm.propTypes = {
	errors: PropTypes.shape().isRequired,
	classes: PropTypes.shape().isRequired,
	switchToggle: PropTypes.shape().isRequired,
	representatives: PropTypes.arrayOf(PropTypes.shape()).isRequired,
	constituencyName: PropTypes.string.isRequired,
	representativeId: PropTypes.string.isRequired,
	formHasError: PropTypes.func.isRequired,
	handleSelectChange: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
	handleSwitch: PropTypes.func.isRequired
};

export default ConstituencyForm;
