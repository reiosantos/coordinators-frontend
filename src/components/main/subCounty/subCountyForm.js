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

const SubCountyForm = (
	{
		errors, classes, subCountyName, representativeId, switchToggle, handleSwitch, constituencies,
		representatives, constituencyId, formHasError, handleSelectChange, onChange, onSubmit
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
			
			<FormControl margin="normal" required fullWidth error={!!errors.subCountyName}>
				<InputLabel htmlFor="subCountyName">Sub County Name</InputLabel>
				<Input
					value={subCountyName}
					onChange={onChange('subCountyName')}
					id="subCountyName"
					name="subCountyName"
					autoComplete="subCountyName"
					autoFocus
				/>
				<FormHelperText error={!!errors.subCountyName}>
					{errors.subCountyName}
				</FormHelperText>
			</FormControl>
			
			<FormControl
				margin="normal"
				fullWidth
				className={classes.formControl}
				error={!!errors.constituencyId}
			>
				<InputLabel htmlFor="name-error">Constituency</InputLabel>
				<Select
					value={constituencyId}
					onChange={handleSelectChange('constituencyId')}
					name="constituencyId"
					input={<Input id="name-error" />}
				>
					<MenuItem value=""><em>None</em></MenuItem>
					{
						constituencies.map(
							rep => (
								<MenuItem key={rep.id} value={rep.id}>
									{rep.constituencyName}
								</MenuItem>
							)
						)
					}
				</Select>
				<FormHelperText error={!!errors.constituencyId}>
					{errors.constituencyId}
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

SubCountyForm.propTypes = {
	errors: PropTypes.shape().isRequired,
	classes: PropTypes.shape().isRequired,
	switchToggle: PropTypes.shape().isRequired,
	representatives: PropTypes.arrayOf(PropTypes.shape()).isRequired,
	constituencies: PropTypes.arrayOf(PropTypes.shape()).isRequired,
	subCountyName: PropTypes.string.isRequired,
	representativeId: PropTypes.string.isRequired,
	constituencyId: PropTypes.string.isRequired,
	formHasError: PropTypes.func.isRequired,
	handleSelectChange: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
	handleSwitch: PropTypes.func.isRequired
};

export default SubCountyForm;
