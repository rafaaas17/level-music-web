import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useState, useMemo } from "react";

// Simula una búsqueda de recurso por número de serie (reemplaza por tu lógica real)
const fetchResourceBySerial = async (serial) => {
  // ...aquí deberías hacer la petición real...
  // Ejemplo simulado:
  if (serial === "A1B2C3D4E5F6") return { name: "Equipo Demo" };
  return null;
};

export const MaintenanceModal = ({
  open,
  onClose,
  onSave,
  loading,
}) => {
  const [form, setForm] = useState({
    type: "",
    description: "",
    serialNumber: "",
    resourceName: "",
    date: new Date().toISOString().slice(0, 10),
  });
  const [resourceLoading, setResourceLoading] = useState(false);
  const [resourceFound, setResourceFound] = useState(null);

  // Busca el recurso cuando el número de serie es válido
  const handleSerialChange = async (value) => {
    const serial = value.replace(/[^A-Z0-9]/gi, "").toUpperCase();
    setForm((f) => ({ ...f, serialNumber: serial, resourceName: "" }));
    setResourceFound(null);
    if (/^[A-Z0-9]{12}$/.test(serial)) {
      setResourceLoading(true);
      const resource = await fetchResourceBySerial(serial);
      setResourceLoading(false);
      setResourceFound(resource);
      setForm((f) => ({
        ...f,
        resourceName: resource ? resource.name : "",
      }));
    }
  };

  const isButtonDisabled = useMemo(() => {
    return (
      loading ||
      !form.type ||
      !form.description ||
      !/^[A-Z0-9]{12}$/.test(form.serialNumber) ||
      !form.resourceName
    );
  }, [loading, form]);

  const handleChange = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }));
  };

  const handleSubmit = async () => {
    if (isButtonDisabled) return;
    await onSave({
      type: form.type,
      description: form.description,
      serialNumber: form.serialNumber,
      resourceName: form.resourceName,
      date: form.date,
    });
    setForm({
      type: "",
      description: "",
      serialNumber: "",
      resourceName: "",
      date: new Date().toISOString().slice(0, 10),
    });
    setResourceFound(null);
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
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h6" fontWeight={600}>
            Crear mantenimiento
          </Typography>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>

        <Box display="flex" gap={2} mb={2} sx={{ flexDirection: "column" }}>
          {/* Tipo de mantenimiento */}
          <TextField
            label="Tipo de mantenimiento"
            fullWidth
            value={form.type}
            onChange={(e) => handleChange("type", e.target.value)}
          />

          {/* Descripción */}
          <TextField
            label="Descripción"
            fullWidth
            multiline
            minRows={4}
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />

          {/* Número de serie */}
          <TextField
            label="Número de serie del recurso"
            fullWidth
            value={form.serialNumber}
            inputProps={{ maxLength: 12, style: { textTransform: "uppercase" } }}
            onChange={(e) => handleSerialChange(e.target.value)}
            helperText="12 caracteres alfanuméricos (ej: A1B2C3D4E5F6)"
            error={
              !!form.serialNumber && !/^[A-Z0-9]{12}$/.test(form.serialNumber)
            }
          />

          {/* Nombre del equipo */}
          {resourceLoading ? (
            <Box display="flex" alignItems="center" gap={1}>
              <CircularProgress size={18} /> <Typography variant="body2">Buscando equipo...</Typography>
            </Box>
          ) : form.resourceName ? (
            <TextField
              label="Nombre del equipo"
              fullWidth
              value={form.resourceName}
              InputProps={{ readOnly: true }}
            />
          ) : (
            !!form.serialNumber &&
            /^[A-Z0-9]{12}$/.test(form.serialNumber) &&
            <Typography color="error" variant="body2">
              Equipo no encontrado
            </Typography>
          )}

          {/* Fecha (actual, no editable) */}
          <TextField
            label="Fecha"
            fullWidth
            value={form.date}
            InputProps={{ readOnly: true }}
          />
        </Box>

        <Button
          variant="contained"
          fullWidth
          onClick={handleSubmit}
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
          Crear
        </Button>
      </Box>
    </Modal>
  );
};
