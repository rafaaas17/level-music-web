import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useEventTypeStore } from "../../../../hooks";
import { Close } from "@mui/icons-material";
import { useMemo } from "react";

export const EventTypeModal = ({
  open,
  onClose,
  eventType = {},
  setEventType,
  loading,
}) => {
  const isEditing = !!eventType && !!eventType._id;
  const { startCreateEventType, startUpdateEventType } = useEventTypeStore();
   
  const handleSave = async () => {
    const eventTypeToSave = {
      ...eventType,
      category: eventType.category || "Social",
    };

    if (!isEditing) {
      const success = await startCreateEventType(eventTypeToSave);
      if (success) onClose();
    } else {
      const success = await startUpdateEventType(
        eventType._id,
        eventTypeToSave
      );
      if (success) onClose();
    }
  };

  // El botón solo debe estar deshabilitado cuando loading es true (está cargando)
  const isButtonDisabled = useMemo(() => loading, [loading]);

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          bgcolor: "background.paper",
          borderRadius: 4,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Typography variant="h6" fontWeight={600}>
            {isEditing ? "Editar evento" : "Agregar evento"}
          </Typography>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>

        <Box display="flex" gap={2} mb={2} sx={{ flexDirection: "column" }}>
          
          <TextField
            label="Nombre"	
            fullWidth
            value={eventType?.type || ""}
            onChange={(e) =>
              setEventType({ ...eventType, type: e.target.value })
            }
          />
           <TextField
            label="descripción"
            fullWidth
            value={eventType?.description || ""}
            onChange={(e) =>
              setEventType({ ...eventType, description: e.target.value })   
            }
          />
          
          <FormControl fullWidth>
            <InputLabel id="category-label">Categoria</InputLabel>
            <Select
              labelId="category-label"
              id="category"
              value={eventType?.category || "Social"}
              onChange={(e) =>
                setEventType({ ...eventType, category: e.target.value })
              }
            >
              <MenuItem value="Social">Social</MenuItem>
              <MenuItem value="Corporativo">Corporativo</MenuItem>
            </Select>
          </FormControl>

           <FormControl fullWidth>
            <InputLabel id="status-label">Estado</InputLabel>
            <Select
              labelId="status-label"
              id="status"
              value={eventType?.status || "Activo"}
              onChange={(e) =>
                setEventType({ ...eventType, status: e.target.value })
              }
            >
              <MenuItem value="Activo">Activo</MenuItem>
              <MenuItem value="Inactivo">Inactivo</MenuItem>
            </Select>
          </FormControl>
  
        </Box>

        <Button
          variant="contained"
          fullWidth
          onClick={handleSave}
          disabled={isButtonDisabled}
          sx={{
            mt: 1,
            backgroundColor: "#212121",
            color: "#fff",
            textTransform: "none",
            py: 1.5,
            borderRadius: 2,
            fontWeight: 600,
          }}
        >
          {isEditing ? "Guardar cambios" : "Agregar"}
        </Button>
      </Box>
    </Modal>
  );
};
