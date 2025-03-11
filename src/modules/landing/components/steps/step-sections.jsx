import { Person, Event, LocationOn, RestaurantMenu } from '@mui/icons-material';
import { PersonalInfoForm, EventDetailsForm, LocationForm, ServicesForm } from '..';

export const StepSections = [
  {
    label: 'Información Personal', 
    icon: <Person />, 
    component: <PersonalInfoForm /> 
  },
  {
    label: 'Detalles del Evento', 
    icon: <Event />,
    component: <EventDetailsForm />
  },
  {
    label: 'Ubicación', 
    icon: <LocationOn />,
    component: <LocationForm />
  },
  {
    label: 'Servicios Adicionales', 
    icon: <RestaurantMenu />,
    component: <ServicesForm />
  }
];