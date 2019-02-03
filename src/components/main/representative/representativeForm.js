import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import Switch from '@material-ui/core/Switch';
import Edit from '@material-ui/icons/Edit';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import StepOneForm from './stepOneForm';
import StepTwoForm from './stepTwoForm';

const getStepContent = (step, props) => {
	switch (step) {
		case 0:
			return <StepOneForm {...props} />;
		case 1:
			return <StepTwoForm {...props} />;
		default:
			return 'Unknown step';
	}
};

const RepresentativeForm = (props) => {
	const {
		classes, switchToggle, handleSwitch, villageId, formHasError, onSubmit,
		steps, activeStep, handleBack, handleNext, handleReset, ...rest
	} = props;
	
	return (
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
				<Stepper activeStep={activeStep}>
					{steps.map(label => (
						<Step key={label}>
							<StepLabel>{label}</StepLabel>
						</Step>
					))}
				</Stepper>
			
				{activeStep === steps.length ? (
					<div>
						<Typography className={classes.instructions}>
							{'You can finish your submission or reset the form.'}
						</Typography>
						<Button
							variant="text"
							fullWidth
							color="secondary"
							onClick={handleReset}
							className={classes.submit}
						>
							{'Reset'}
						</Button>
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
					</div>
				) : (
					<Fragment>
						{getStepContent(activeStep, { ...props, ...rest })}
					
						<div>
							<Grid container>
								<Grid item sm={6} lg={6} md={6}>
									<Button
										disabled={activeStep === 0}
										onClick={handleBack}
										size="medium"
										fullWidth
										style={{ marginRight: '.5em' }}
										className={classes.button}
									>
										{'Back'}
									</Button>
								</Grid>
								<Grid item sm={6} lg={6} md={6}>
									<Button
										variant="contained"
										color="primary"
										fullWidth
										disabled={activeStep === steps.length - 1 ? formHasError() : !villageId}
										style={{ marginLeft: '.5em' }}
										onClick={handleNext}
										className={classes.button}
									>
										{activeStep === steps.length - 1 ? 'Finish' : 'Next'}
									</Button>
								</Grid>
							</Grid>
						</div>
					</Fragment>
				)}
			</form>
		</Paper>
	);
};

RepresentativeForm.propTypes = {
	errors: PropTypes.shape().isRequired,
	classes: PropTypes.shape().isRequired,
	switchToggle: PropTypes.shape().isRequired,
	
	constituencies: PropTypes.arrayOf(PropTypes.shape()).isRequired,
	constituencyId: PropTypes.string.isRequired,
	subCounties: PropTypes.arrayOf(PropTypes.shape()).isRequired,
	subCountyId: PropTypes.string.isRequired,
	parishes: PropTypes.arrayOf(PropTypes.shape()).isRequired,
	parishId: PropTypes.string.isRequired,
	villages: PropTypes.arrayOf(PropTypes.shape()).isRequired,
	villageId: PropTypes.string.isRequired,
	
	formHasError: PropTypes.func.isRequired,
	handleSelectChange: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
	handleSwitch: PropTypes.func.isRequired,
	
	steps: PropTypes.array.isRequired,
	activeStep: PropTypes.number.isRequired,
	handleBack: PropTypes.func.isRequired,
	handleNext: PropTypes.func.isRequired,
	handleReset: PropTypes.func.isRequired,
	
	firstName: PropTypes.string.isRequired,
	lastName: PropTypes.string.isRequired,
	contact: PropTypes.string.isRequired,
	nin: PropTypes.string.isRequired
};

export default RepresentativeForm;
