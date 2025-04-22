import React from 'react';
import { Box, Stepper, Step, StepLabel, Button, Typography, useMediaQuery, useTheme, Paper, Divider } from '@mui/material';
import { LandingLayout } from '../layout/landing-layout';
import { CustomStepIcon, StepSections } from '../components';
import { useDispatch } from 'react-redux';
import { useEventStore } from '../../../hooks/use-event-store';



export const RequestPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); 
 
  const dispatch = useDispatch();
  const { 
    resetEventForm,
    updateEventSection,
    goToNextPage,
    goToPreviousPage,
    validateEventForm,
    currentPage

   } = useEventStore();
   const handleNext = () => {
    // Validar los datos de la página actual antes de avanzar
    const validation = validateEventForm();
    if (!validation.valid) {
      alert(validation.message); // Mostrar mensaje de error si la validación falla
      return;
    }

    // Avanzar a la siguiente página
    goToNextPage();
  };

  const handleBack = () => {
    // Retroceder a la página anterior
    goToPreviousPage();
  };
  const handleFinalize = () => {
    // Aquí podrías enviar los datos a un backend o realizar alguna acción final
    alert('Formulario completado. Datos enviados correctamente.');

    // Reiniciar el formulario
    resetEventForm();
  };

  const renderStepContent = (step) => {
    // Renderizar el componente correspondiente a cada paso
    if (step !== StepSections.length ) {
      return StepSections[step].component;
    }

    // Mensaje final en el último paso
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
        <Stepper activeStep={currentPage }  orientation={isMobile ? 'vertical' : 'horizontal'}>
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
          {renderStepContent(currentPage )}
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button 
              color="inherit" 
              onClick={handleBack} 
              sx={{ mr: 1, display: { xs: currentPage  === 0 ? 'none' : 'block' } }}
            >
              Atrás
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={currentPage === StepSections.length ? handleFinalize : handleNext}>
              {currentPage === StepSections.length  ? 'Finalizar' : 'Siguiente'}
            </Button>
          </Box>
        </Box>
      </Paper>
    </LandingLayout>
  );
};