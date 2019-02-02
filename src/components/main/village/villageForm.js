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

const VillageForm = (
	{
		errors, classes, villageName, representativeId, switchToggle, handleSwitch, parishes,
		representatives, parishId, formHasError, handleSelectChange, onChange, onSubmit
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
			
			<FormControl margin="normal" required fullWidth error={!!errors.villageName}>
				<InputLabel htmlFor="villageName">Village Name</InputLabel>
				<Input
					value={villageName}
					onChange={onChange('villageName')}
					id="villageName"
					name="villageName"
					autoComplete="villageName"
					autoFocus
				/>
				<FormHelperText error={!!errors.villageName}>
					{errors.villageName}
				</FormHelperText>
			</FormControl>
			
			<FormControl
				margin="normal"
				fullWidth
				className={classes.formControl}
				error={!!errors.parishId}
			>
				<InputLabel htmlFor="name-error">Parish</InputLabel>
				<Select
					value={parishId}
					onChange={handleSelectChange('parishId')}
					name="parishId"
					input={<Input id="name-error" />}
				>
					<MenuItem value=""><em>None</em></MenuItem>
					{
						parishes.map(
							rep => (
								<MenuItem key={rep.id} value={rep.id}>
									{rep.parishName}
								</MenuItem>
							)
						)
					}
				</Select>
				<FormHelperText error={!!errors.parishId}>
					{errors.parishId}
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

VillageForm.propTypes = {
	errors: PropTypes.shape().isRequired,
	classes: PropTypes.shape().isRequired,
	switchToggle: PropTypes.shape().isRequired,
	representatives: PropTypes.arrayOf(PropTypes.shape()).isRequired,
	parishes: PropTypes.arrayOf(PropTypes.shape()).isRequired,
	villageName: PropTypes.string.isRequired,
	representativeId: PropTypes.string.isRequired,
	parishId: PropTypes.string.isRequired,
	formHasError: PropTypes.func.isRequired,
	handleSelectChange: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
	handleSwitch: PropTypes.func.isRequired
};

export default VillageForm;
