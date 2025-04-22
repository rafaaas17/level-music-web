import { Box, TextField } from '@mui/material';
import { useEventStore } from '../../../../hooks/use-event-store';

export const PersonalInfoForm = () => {
  const { sections, updateEventSection, currentPage } = useEventStore();
  const { fullName, email, phone } = sections.find((section) => section.id === currentPage).data;
  console.log('Valores actuales:', { fullName, email, phone }); // Depuración

  return (
    <Box>
      <TextField
        fullWidth
        label="Nombre Completo"
        margin="normal"
        value={fullName } // Asegúrate de que no sea undefined
        onChange={(e) => updateEventSection(currentPage, { fullName: e.target.value })}
      />
      <TextField
        fullWidth
        label="Correo Electrónico"
        margin="normal"
        value={email } // Asegúrate de que no sea undefined
        onChange={(e) => updateEventSection(currentPage, { email: e.target.value })}
      />
      <TextField
        fullWidth
        label="Teléfono de Contacto"
        margin="normal"
        value={phone } // Asegúrate de que no sea undefined
        onChange={(e) => updateEventSection(currentPage, { phone: e.target.value })}
      />
    </Box>
  );
};
