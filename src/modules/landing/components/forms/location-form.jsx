import { Box, TextField, MenuItem } from '@mui/material';

export const LocationForm = () => {
  return (
    <Box>
      <TextField fullWidth label="Dirección Exacta" margin="normal" />
      <TextField fullWidth label="Referencia del Lugar" margin="normal" />
      <TextField fullWidth select label="Tipo de Lugar" margin="normal">
        <MenuItem value="Abierto">Abierto</MenuItem>
        <MenuItem value="Cerrado">Cerrado</MenuItem>
      </TextField>
      <TextField fullWidth label="Tamaño del Lugar (m² o capacidad)" margin="normal" />
    </Box>
  );
};
