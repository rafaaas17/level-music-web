import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useWorkerTypesStore } from "../../../../hooks";
import { useMemo } from "react";

export const WorkerTypeModal = ({
  open,
  onClose,
  workerType = {},
  setWorkerType,
  loading,
}) => {
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
            {isEditing ? "Editar tipo de trabajador" : "Agregar tipo de trabajador"}
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
            value={workerType?.name || ""}
            onChange={(e) =>
              setWorkerType({ ...workerType, name: e.target.value })
            }
          />

          {/* Descripcion */}
          <TextField
            label="Descripción"
            fullWidth
            value={workerType?.description || ""}
            onChange={(e) =>
              setWorkerType({ ...workerType, description: e.target.value })
            }
          />

          {/* Estado */}
          <FormControl fullWidth>
            <InputLabel id="status-label">Estado</InputLabel>
            <Select
              labelId="status-label"
              id="status"
              value={workerType?.status || "Activo"}
              onChange={(e) =>
                setWorkerType({ ...workerType, status: e.target.value })
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
