import { Box, FormControlLabel, Checkbox, TextField } from '@mui/material';

export const ServicesForm = () => {
  return (
    <Box>
      <FormControlLabel control={<Checkbox />} label="¿Desea servicio de comida?" />
      <TextField fullWidth multiline rows={4} label="Servicios adicionales" margin="normal" />
    </Box>
  );
};
