import { Box, Typography, TextField, Button } from '@mui/material';
import { useServiceStore } from '../../../../../hooks';

export const ServiceAddPage = () => {
  const { startCreateService } = useServiceStore();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newService = Object.fromEntries(formData.entries());
    const success = await startCreateService(newService);
    if (success) {
      // Redirigir o mostrar mensaje de éxito
      console.log('Servicio creado exitosamente');
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>Agregar Nuevo Servicio</Typography>
      <form onSubmit={handleSubmit}>
        <TextField name="name" label="Nombre del Servicio" fullWidth sx={{ mb: 2 }} required />
        <TextField name="description" label="Descripción" fullWidth sx={{ mb: 2 }} required />
        <TextField name="price" label="Precio" type="number" fullWidth sx={{ mb: 2 }} required />
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>Guardar</Button>
      </form>
    </Box>
  );
};
