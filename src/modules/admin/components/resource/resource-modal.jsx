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
import { Close } from "@mui/icons-material";
import { useMemo } from "react";

export const ResourceModal = ({
  open,
  onClose,
  resource = {},
  setResource,
  loading,
  onSave,
}) => {
  const isEditing = !!resource?._id;

  // Solo habilita el botón si el número de serie tiene exactamente 12 caracteres alfanuméricos
  const isButtonDisabled = useMemo(() => {
    return (
      loading ||
      !resource?.name ||
      !resource?.type ||
      !resource?.serialNumber ||
      !resource?.status ||
      !/^[A-Z0-9]{12}$/.test(resource.serialNumber)
    );
  }, [loading, resource]);

  // Forzar location a "Almacen" siempre
  const handleChange = (field, value) => {
    setResource({
      ...resource,
      [field]: value,
      location: "Almacen",
    });
  };

  const handleSave = async () => {
    // location siempre es "Almacen"
    await onSave({ ...resource, location: "Almacen" });
  };

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
            {isEditing ? "Editar recurso" : "Agregar recurso"}
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
            value={resource?.name || ""}
            onChange={(e) => handleChange("name", e.target.value)}
          />

          {/* Tipo de recurso */}
          <FormControl fullWidth>
            <InputLabel id="type-label">Tipo de recurso</InputLabel>
            <Select
              labelId="type-label"
              id="type"
              value={resource?.type || ""}
              label="Tipo de recurso"
              onChange={(e) => handleChange("type", e.target.value)}
            >
              <MenuItem value="Equipo">Equipo</MenuItem>
              <MenuItem value="Luz">Luz</MenuItem>
            </Select>
          </FormControl>

          {/* Numero de serie */}
          <TextField
            label="Número de serie"
            fullWidth
            value={resource?.serialNumber || ""}
            inputProps={{ maxLength: 12, style: { textTransform: "uppercase" } }}
            onChange={(e) =>
              handleChange(
                "serialNumber",
                e.target.value.replace(/[^A-Z0-9]/gi, "").toUpperCase()
              )
            }
            helperText="Debe contener 12 caracteres alfanuméricos (ej: A1B2C3D4E5F6)"
            error={
              !!resource?.serialNumber &&
              !/^[A-Z0-9]{12}$/.test(resource.serialNumber)
            }
          />

          {/* Estado */}
          <FormControl fullWidth>
            <InputLabel id="status-label">Estado</InputLabel>
            <Select
              labelId="status-label"
              id="status"
              value={resource?.status || ""}
              label="Estado"
              onChange={(e) => handleChange("status", e.target.value)}
            >
              <MenuItem value="Activo">Activo</MenuItem>
              <MenuItem value="Inactivo">Inactivo</MenuItem>
              <MenuItem value="En reparación">En reparación</MenuItem>
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
