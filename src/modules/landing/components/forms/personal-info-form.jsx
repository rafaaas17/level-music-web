import { Box, TextField } from '@mui/material';

export const PersonalInfoForm = () => {
  return (
    <Box>
      <TextField fullWidth label="Nombre Completo" margin="normal" />
      <TextField fullWidth label="Correo Electrónico" margin="normal" />
      <TextField fullWidth label="Teléfono de Contacto" margin="normal" />
    </Box>
  );
};
