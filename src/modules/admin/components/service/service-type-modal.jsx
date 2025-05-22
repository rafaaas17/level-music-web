import { Box, Button, IconButton, Modal, TextField, Typography } from "@mui/material";
import { useServiceTypeStore } from "../../../../hooks";
import { Close } from "@mui/icons-material";

export const ServiceTypeModal = ({ open, onClose, serviceType  = {},
setServiceType }) => {
  const isEditing = !!serviceType?._id;
  const { startCreateServiceType, startUpdateServiceType } = useServiceTypeStore();

  const handleSave = async () => {
    if (!isEditing) {
      const success = await startCreateServiceType(serviceType); 
      if (success) onClose(); 
    } else {
      const success = await startUpdateServiceType(serviceType._id, serviceType); 
      if (success) onClose();
    }
  };
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: "90%", sm: 500 },
          bgcolor: 'background.paper',
          borderRadius: 4,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h6" fontWeight={600}>
            {isEditing ? 'Editar tipo de servicio' : 'Agregar tipo de servicio'}
          </Typography>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>

        <Box display="flex" gap={2} mb={2} sx={{ flexDirection: 'column' }}>
          <TextField
            label="Nombre"
            fullWidth
            value={serviceType?.name || ''} 
            onChange={(e) => setServiceType({ ...serviceType, name: e.target.value })}
          />
          <TextField
            label="Descripción"
            fullWidth
            value={serviceType?.description || ''} 
            onChange={(e) => setServiceType({ ...serviceType, description: e.target.value })}
          />
        </Box>

        <Button
          variant="contained"
          fullWidth
          onClick={handleSave}
          sx={{
            mt: 1,
            backgroundColor: '#212121',
            color: '#fff',
            textTransform: 'none',
            py: 1.5,
            borderRadius: 2,
            fontWeight: 600,
          }}
        >
          {isEditing ? 'Guardar cambios' : 'Agregar'}
        </Button>
      </Box>
    </Modal>
  );
};