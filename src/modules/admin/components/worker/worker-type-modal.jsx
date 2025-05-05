import React from 'react';
import { Modal, Box, Typography, TextField, Button, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import { useWorkerTypesStore } from '../../../../hooks';

export const WorkerTypeModal = ({ open, onClose, workerType = {}, setWorkerType }) => {
  const isEditing = !!workerType?._id;
  const { startCreateWorkerType, startUpdateWorkerType } = useWorkerTypesStore();

  const handleSave = async () => {
    if (!isEditing) {
      const success = await startCreateWorkerType(workerType); 
      if (success) onClose(); 
    } else {
      const success = await startUpdateWorkerType(workerType._id, workerType); 
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
          width: 500,
          bgcolor: 'background.paper',
          borderRadius: 4,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h6" fontWeight={600}>
            {isEditing ? 'Editar tipo de trabajador' : 'Agregar tipo de trabajador'}
          </Typography>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>

        <Box display="flex" gap={2} mb={2} sx={{ flexDirection: 'column' }}>
          <TextField
            label="Nombre"
            fullWidth
            value={workerType?.name || ''} 
            onChange={(e) => setWorkerType({ ...workerType, name: e.target.value })}
          />
          <TextField
            label="Descripción"
            fullWidth
            value={workerType?.description || ''} 
            onChange={(e) => setWorkerType({ ...workerType, description: e.target.value })}
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
