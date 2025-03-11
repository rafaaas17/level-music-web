import React from 'react';
import { Box, Stepper, Step, StepLabel, Button, Typography, useMediaQuery, useTheme, Paper, Divider } from '@mui/material';
import { LandingLayout } from '../layout/landing-layout';
import { CustomStepIcon, StepSections } from '../components';

export const RequestPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); 
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const renderStepContent = (step) => {
    if (step !== 3) return StepSections[step].component;
    
    return (
      <Typography sx={{ fontSize: 16 }}>
        Hemos recibido tus datos, en breve te enviaremos la proforma de tu evento.
      </Typography>
    );
  };

  return (
    <LandingLayout>
      <Typography sx={{ mt: { xs: 9, md: 12 }, fontSize: 30 }}>
        Empieza a organizar tu evento
      </Typography>
      <Typography sx={{ mt: 2, fontWeight: 100, fontSize: 16 }}>
        Completa los datos y recibe una proforma para tu evento.
      </Typography>

      <Paper 
        sx={{ 
          marginTop: 4,
          padding: 3,
          marginBottom: { xs: 4, md: 0 }
        }}
      >
        <Stepper activeStep={activeStep} orientation={isMobile ? 'vertical' : 'horizontal'}>
          {StepSections.map((step) => (
            <Step key={step.label}>
              <StepLabel slots={{ stepIcon: (props) => <CustomStepIcon {...props} icon={step.icon} /> }}>
                {step.label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>


        <Divider sx={{ mt: 3, marginX: -3 }} />

        <Box sx={{ mt: 2 }}>
          {renderStepContent(activeStep)}
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button 
              color="inherit" 
              onClick={handleBack} 
              sx={{ mr: 1, display: { xs: activeStep === 0 ? 'none' : 'block' } }}
            >
              Atrás
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleNext}>
              {activeStep === StepSections.length - 1 ? 'Finalizar' : 'Siguiente'}
            </Button>
          </Box>
        </Box>
      </Paper>
    </LandingLayout>
  );
};