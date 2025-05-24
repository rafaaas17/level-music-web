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
import { useMemo, useEffect } from "react";
import { useForm } from "react-hook-form";

export const EventTypeModal = ({
  open,
  onClose,
  eventType = {},
  setEventType,
  loading,
}) => {
  const isEditing = !!eventType?._id;
  const { startCreateEventType, startUpdateEventType } = useEventTypeStore();

  const handleSave = async () => {
    if (!isEditing) {
      const success = await startCreateEventType(eventType);
      if (success) onClose();
    } else {
      const success = await startUpdateEventType(eventType._id, eventType);
      if (success) onClose();
    }
  };

  const isButtonDisabled = useMemo(() => loading, [loading]);

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "90%", sm: 500 },
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
          {/* Nombre */}
          <TextField
            label="Nombre"	
            fullWidth
            value={eventType?.type || ""}
            onChange={(e) =>
              setEventType({ ...eventType, type: e.target.value })
            }
          />

          {/* Descripcion */}
           <TextField
            label="Descripción"
            fullWidth
            value={eventType?.description || ""}
            onChange={(e) =>
              setEventType({ ...eventType, description: e.target.value })   
            }
          />

          {/* Categoria */}
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

          {/* Estado */}
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
