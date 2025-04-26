import { Box, FormControlLabel, Checkbox, TextField } from '@mui/material';
import { useEventStore } from '../../../../hooks';

export const ServicesForm = () => {
  const { sections, updateEventSection, currentPage } = useEventStore();

  const { foodService,foodDetails, additionalServices,  } = sections.find((section) => section.id === currentPage).data;
  return (
    <Box>
      <FormControlLabel 
      control={<Checkbox 
        checked={foodService} 
        onChange={(e) => updateEventSection(currentPage,{ foodService: e.target.checked })}

      />} 
      label="¿Desea servicio de comida?" 
      />
      <TextField 
      fullWidth 
      label="Detalles de comida" 
      margin="normal" 
      value={foodDetails}
      onChange={(e) => updateEventSection(currentPage,{ foodDetails: e.target.value })}
      />
      <TextField 
      fullWidth 
      multiline 
      rows={4} 
      label="Servicios adicionales" 
      margin="normal"
      value={additionalServices}
      onChange={(e) => updateEventSection(currentPage,{ additionalServices: e.target.value })} 
      />
    </Box>
  );
};
