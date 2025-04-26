import { Box, TextField, MenuItem } from '@mui/material';
import { useEventStore } from '../../../../hooks';

export const LocationForm = () => {
  const { sections, updateEventSection, currentPage } = useEventStore();

  const {
    exactAddress,
    placeReference,
    placeType,
    placeCapacity,
  } = sections.find((section) => section.id === currentPage).data;
  return (
    <Box>
      <TextField 
      fullWidth 
      label="Dirección Exacta" 
      margin="normal" 
      value={exactAddress}
      onChange={(e) => updateEventSection(currentPage,{ exactAddress: e.target.value })}
      />
      <TextField 
      fullWidth 
      label="Referencia del Lugar" 
      margin="normal" 
      value={placeReference}
      onChange={(e) => updateEventSection(currentPage,{ placeReference: e.target.value })}
      />
      <TextField 
      fullWidth 
      select 
      label="Tipo de Lugar" 
      margin="normal"
      value={placeType}
      onChange={(e) => updateEventSection(currentPage,{ placeType: e.target.value })}
      >
        <MenuItem value="Casa">Casa</MenuItem>
        <MenuItem value="Salón">Salón</MenuItem>
        <MenuItem value="Parque">Parque</MenuItem>
        <MenuItem value="Otro">Otro</MenuItem>
      
        
      </TextField>
      <TextField 
      fullWidth 
      label="Tamaño del Lugar (m² o capacidad)" 
      margin="normal" 
      value={placeCapacity}
      onChange={(e) => updateEventSection(currentPage,{ placeCapacity: parseInt(e.target.value, 10) })}
      />

    </Box>
  );
};
