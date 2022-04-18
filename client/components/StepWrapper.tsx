import {
	Card,
	Container,
	Grid,
	Step,
	StepLabel,
	Stepper,
} from '@material-ui/core';
import React, { FC } from 'react';

interface StepWrapperProps {
	activeStep: number;
}
const steps = [
	`Информация о треке`,
	`Загрузите обложку`,
	`Загрузите аудио файл`,
];
const StepWrapper: FC<StepWrapperProps> = ({ activeStep, children }) => {
	return (
		<Container>
			<Stepper activeStep={activeStep}>
				{steps.map((step, index) => (
					<Step key={index} completed={activeStep > index}>
						<StepLabel>{step}</StepLabel>
					</Step>
				))}
			</Stepper>
			<Grid
				container
				justifyContent='center'
				style={{ margin: '70ps 0', height: 270 }}
			>
				<Card style={{ width: 600 }}>{children}</Card>
			</Grid>
		</Container>
	);
};

export default StepWrapper;
