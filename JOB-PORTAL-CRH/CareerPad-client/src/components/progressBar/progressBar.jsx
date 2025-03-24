import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepConnector from '@mui/material/StepConnector';
import StepIcon from '@mui/material/StepIcon';
import { styled } from '@mui/material/styles';
import { GlobalStyles } from '@mui/material';

const steps = [
  'Location',
  'Salary Expectations',
  'Desired Job Roles',
];

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.Mui-active .MuiStepConnector-line`]: {
    borderColor: '#2A85FE',
  },
  [`&.Mui-completed .MuiStepConnector-line`]: {
    borderColor: '#2A85FE',
  },
  [`& .MuiStepConnector-line`]: {
    borderWidth: 3,
    borderRadius: 1,
  },
}));

const QontoStepLabel = (props) => {
  const { active, completed, ...rest } = props;
  return (
    <StepLabel
      {...rest}
      sx={{
        '& .MuiStepLabel-label': {
          color: active || completed ? '#2A85FE !important' : 'inherit',
          fontWeight: active ? 500 : 'normal',
          marginBottom: '10px'
        },
      }}
    />
  );
};

const QontoStepIcon = styled(StepIcon)(({ theme }) => ({
  '&.MuiStepIcon-root': {
    width: 40,  // Increase width of the icon
    height: 40, // Increase height of the icon
  },
  color: theme.palette.grey[400],
  '&.Mui-active': {
    color: '#2A85FE !important',
  },
  '&.Mui-completed': {
    color: '#2A85FE !important',
  },
}));
export default function HorizontalLinearAlternativeLabelStepper({ activeStep }) {
  return (
    <Box sx={{ width: '100%' }}>
      <GlobalStyles
        styles={{
          '.MuiSvgIcon-root.MuiStepIcon-root.Mui-active': {
            color: '#2A85FE !important',
          },
          '.MuiSvgIcon-root.MuiStepIcon-root.Mui-completed': {
            color: '#2A85FE !important',
          },
          '.MuiStepLabel-label.MuiStepLabel-alternativeLabel': {
            marginTop: '0 !important',
            width:'220px',
          },
          '.MuiStepConnector-root .MuiStepConnector-line': {
            width: '200px', 
          },
        }}
      />
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        connector={<QontoConnector />}
        StepIconComponent={QontoStepIcon}
      >
        {steps.map((label, index) => (
          <Step key={label}>
            <QontoStepLabel active={activeStep === index} completed={activeStep > index}>
              {label}
            </QontoStepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
