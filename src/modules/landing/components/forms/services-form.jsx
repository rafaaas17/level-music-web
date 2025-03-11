import { Box, FormControlLabel, Checkbox, TextField } from '@mui/material';

export const ServicesForm = () => {
  return (
    <Box>
      <FormControlLabel control={<Checkbox />} label="¿Desea servicio de comida?" />
      <TextField fullWidth label="Especificar comidas (si aplica)" margin="normal" />
      <TextField fullWidth multiline rows={3} label="Servicios adicionales" margin="normal" />
    </Box>
  );
};
