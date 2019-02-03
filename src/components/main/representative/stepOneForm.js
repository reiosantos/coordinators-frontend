import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { randomNumber } from '../../../utils';

const StepOneForm = (
	{
		classes, errors, constituencyId, constituencies, subCountyId, subCounties, parishId,
		parishes, villages, villageId, handleSelectChange
	}
) => (
	<Fragment>
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
							<MenuItem key={randomNumber()} value={rep.id}>
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
							<MenuItem key={randomNumber()} value={rep.id}>
								{rep.subCountyName}
							</MenuItem>
						)
					)
				}
			</Select>
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
							<MenuItem key={randomNumber()} value={rep.id}>
								{rep.parishName}
							</MenuItem>
						)
					)
				}
			</Select>
		</FormControl>
		
		<FormControl
			margin="normal"
			fullWidth
			className={classes.formControl}
			error={!!errors.villageId}
		>
			<InputLabel htmlFor="name-error">Village</InputLabel>
			<Select
				value={villageId}
				onChange={handleSelectChange('villageId')}
				name="villageId"
				input={<Input id="name-error" />}
			>
				<MenuItem value=""><em>None</em></MenuItem>
				{
					villages.map(
						rep => (
							<MenuItem key={randomNumber()} value={rep.id}>
								{rep.villageName}
							</MenuItem>
						)
					)
				}
			</Select>
		</FormControl>
	</Fragment>
);

StepOneForm.propTypes = {
	errors: PropTypes.shape().isRequired,
	classes: PropTypes.shape().isRequired,
	constituencies: PropTypes.arrayOf(PropTypes.shape()).isRequired,
	constituencyId: PropTypes.string.isRequired,
	subCounties: PropTypes.arrayOf(PropTypes.shape()).isRequired,
	subCountyId: PropTypes.string.isRequired,
	parishes: PropTypes.arrayOf(PropTypes.shape()).isRequired,
	parishId: PropTypes.string.isRequired,
	villages: PropTypes.arrayOf(PropTypes.shape()).isRequired,
	villageId: PropTypes.string.isRequired,
	handleSelectChange: PropTypes.func.isRequired
};

export default StepOneForm;
