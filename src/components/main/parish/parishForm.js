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
import { isRepresentativeAvailable } from '../../../utils';

const ParishForm = (
	{
		errors, classes, parishName, representativeId, switchToggle, handleSwitch, subCounties,
		representatives, subCountyId, formHasError, handleSelectChange, onChange, onSubmit
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
			
			<FormControl margin="normal" required fullWidth error={!!errors.parishName}>
				<InputLabel htmlFor="parishName">Parish Name</InputLabel>
				<Input
					value={parishName}
					onChange={onChange('parishName')}
					id="parishName"
					name="parishName"
					autoComplete="parishName"
					autoFocus
				/>
				<FormHelperText error={!!errors.parishName}>
					{errors.parishName}
				</FormHelperText>
			</FormControl>
			
			<FormControl
				margin="normal"
				fullWidth
				className={classes.formControl}
				error={!!errors.subCountyId}
			>
				<InputLabel htmlFor="name-error">Sub County</InputLabel>
				<Select
					value={subCountyId}
					onChange={handleSelectChange('subCountyId')}
					name="subCountyId"
					input={<Input id="name-error" />}
				>
					<MenuItem value=""><em>None</em></MenuItem>
					{
						subCounties.map(
							rep => (
								<MenuItem key={rep.id} value={rep.id}>
									{rep.subCountyName}
								</MenuItem>
							)
						)
					}
				</Select>
				<FormHelperText error={!!errors.subCountyId}>
					{errors.subCountyId}
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
					onChange={handleSelectChange('representativeId')}
					name="representativeId"
					input={<Input id="name-error" />}
				>
					<MenuItem value=""><em>None</em></MenuItem>
					{
						representatives.map(
							(rep) => {
								if (representativeId) {
									return (
										<MenuItem key={rep.id} value={rep.id}>
											{`${rep.firstName} ${rep.lastName} - From - ${rep.Village.villageName}`}
										</MenuItem>
									);
								}
								const representative = isRepresentativeAvailable(rep);
								if (representative) {
									return (
										<MenuItem key={rep.id} value={rep.id}>
											{`${rep.firstName} ${rep.lastName} - From - ${rep.Village.villageName}`}
										</MenuItem>
									);
								}
								return null;
							}
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

ParishForm.propTypes = {
	errors: PropTypes.shape().isRequired,
	classes: PropTypes.shape().isRequired,
	switchToggle: PropTypes.shape().isRequired,
	representatives: PropTypes.arrayOf(PropTypes.shape()).isRequired,
	subCounties: PropTypes.arrayOf(PropTypes.shape()).isRequired,
	parishName: PropTypes.string.isRequired,
	representativeId: PropTypes.string.isRequired,
	subCountyId: PropTypes.string.isRequired,
	formHasError: PropTypes.func.isRequired,
	handleSelectChange: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
	handleSwitch: PropTypes.func.isRequired
};

export default ParishForm;
