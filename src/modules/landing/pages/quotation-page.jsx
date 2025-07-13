import { useForm, FormProvider } from 'react-hook-form';
import {
  Box,
  Button,
  Divider,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography
} from '@mui/material';
import { CustomStepIcon, StepSections } from '../components/';
import { useStepperStore } from '../../../hooks';
import { useScreenSizes } from '../../../shared/constants/screen-width';

export const QuotationPage = () => {
  const formMethods = useForm({
    mode: 'onBlur',
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      eventCategory: '',
      eventType: '',
      attendeesCount: 0,
      eventSchedule: '',
      eventDescription: '',
      exactAddress: '',
      placeReference: '',
      placeType: '',
      placeCapacity: 0,
      foodService: false,
      foodDetails: '',
      additionalServices: '',
      imageFile: null,
    },
  });

  const { handleSubmit, reset } = formMethods;

  const { 
    currentPage, 
    goToNextPage, 
    goToPreviousPage 
  } = useStepperStore();

  const { isMd } = useScreenSizes(); 

  const onNext = handleSubmit(() => {
    goToNextPage();
  });

  const lastStepIndex = StepSections.length;

  const onFinish = handleSubmit((data) => {
    console.log('Datos completos:', data);
    reset();
    goToPreviousPage();
  });

  return (
    <FormProvider {...formMethods}>
      <Typography sx={{ mt: { xs: 9, md: 12 }, fontSize: 30 }}>
        Empieza a organizar tu evento
      </Typography>
      <Typography sx={{ mt: 2, fontWeight: 100, fontSize: 16 }}>
        Completa los datos y recibe una proforma para tu evento.
      </Typography>

      <Paper sx={{ mt: 4, p: 3, mb: { xs: 4, md: 0 } }}>
        <Stepper
          activeStep={currentPage}
          orientation={isMd ? 'horizontal' : 'vertical'}
        >
          {StepSections.map((step) => (
            <Step key={step.label}>
              <StepLabel
                slots={{
                  stepIcon: (props) => <CustomStepIcon {...props} icon={step.icon} />
                }}
              >
                {step.label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        <Divider sx={{ mt: 3, mx: -3 }} />

        <Box sx={{ mt: 2 }}>
          {currentPage < lastStepIndex
            ? StepSections[currentPage].component
            : (
              <Typography sx={{ fontSize: 16 }}>
                ¡Listo! En breve te enviaremos la proforma de tu evento.
              </Typography>
            )
          }

          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              onClick={goToPreviousPage}
              sx={{ mr: 1, visibility: currentPage === 0 ? 'hidden' : 'visible' }}
            >
              Atrás
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={currentPage === lastStepIndex ? onFinish : onNext}>
              {currentPage === lastStepIndex ? 'Finalizar' : 'Siguiente'}
            </Button>
          </Box>
        </Box>
      </Paper>
    </FormProvider>
  );
};
