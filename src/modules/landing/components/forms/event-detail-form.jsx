import { Box, TextField, MenuItem } from '@mui/material';

export const EventDetailsForm = () => {
  return (
    <Box>
      <TextField fullWidth select label="Categoría del Evento" margin="normal">
        <MenuItem value="Social">Social</MenuItem>
        <MenuItem value="Corporativo">Corporativo</MenuItem>
      </TextField>
      <TextField fullWidth select label="Tipo del Evento" margin="normal">
        <MenuItem value="Social">Social</MenuItem>
        <MenuItem value="Corporativo">Corporativo</MenuItem>
      </TextField>
      <TextField fullWidth label="Cantidad de Asistentes" type="number" margin="normal" />
      <TextField fullWidth label="Horario del Evento" margin="normal" />
      <TextField fullWidth multiline rows={3} label="Descripción del Evento" margin="normal" />
    </Box>
  );
};
