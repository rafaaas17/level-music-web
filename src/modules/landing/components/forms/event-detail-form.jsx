import { Box, TextField, MenuItem } from '@mui/material';
import { useEventStore } from '../../../../hooks/use-event-store';


export const EventDetailsForm = () => {
  const { sections, updateEventSection, currentPage } = useEventStore();

  const { eventCategory, eventType, attendeesCount, eventSchedule, eventDescription} = sections.find((section) => section.id === currentPage).data;
  
  const handleNext = () => {
    // Validar los datos de la página actual antes de avanzar
    const validation = validateCurrentPage();
    if (!validation.valid) {
      alert(validation.message); // Mostrar mensaje de error si la validación falla
      return;
    }
  }
  
  return (
    <Box>
      <TextField
        fullWidth
        select
        label="Categoría del Evento"
        margin="normal"
        value={eventCategory}
        onChange={(e) => updateEventSection(currentPage,{ eventCategory: e.target.value })}
      >
        <MenuItem value="Social">Social</MenuItem>
        <MenuItem value="Corporativo">Corporativo</MenuItem>
      </TextField>
      <TextField
        fullWidth
        select
        label="Tipo del Evento"
        margin="normal"
        value={eventType}
        onChange={(e) => updateEventSection(currentPage,{ eventType: e.target.value })}
      >
        <MenuItem value="Formal">Formal</MenuItem>
        <MenuItem value="Informal">Informal</MenuItem>
      </TextField>
      <TextField
        fullWidth
        label="Cantidad de Asistentes"
        type="number"
        margin="normal"
        value={attendeesCount}
        onChange={(e) => updateEventSection(currentPage,{ attendeesCount: parseInt(e.target.value, 10) })}
      />
      <TextField
        fullWidth
        label="Horario del Evento"
        margin="normal"
        value={eventSchedule}
        onChange={(e) => updateEventSection(currentPage,{ eventSchedule: e.target.value })}
      />
      <TextField
        fullWidth
        multiline
        rows={3}
        label="Descripción del Evento"
        margin="normal"
        value={eventDescription}
        onChange={(e) => updateEventSection(currentPage,{ eventDescription: e.target.value })}
      />
    </Box>
  );
};
