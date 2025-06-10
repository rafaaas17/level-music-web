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
import { useMemo } from "react";
import { useResourceStore } from "../../../../hooks";

export const MaintenanceModal = ({ 
  open, 
  onClose, 
  onSave, 
  loading 
}) => { 
  const { startSearchingResource } = useResourceStore();

  const handleSerialChange = async (value) => {
    const serial = value.replace(/[^A-Z0-9]/gi, "").toUpperCase();
    setForm((f) => ({ ...f, serialNumber: serial, resourceName: "" }));
    setResourceFound(null);

    if (serial.length === 12 && /^[A-Z0-9]{12}$/.test(serial)) {
      setResourceLoading(true);
      const result = await startSearchingResource(serial);
      setResourceLoading(false);
      if (result && result.ok && result.data) {
        setResourceFound(result.data);
        setForm((f) => ({
          ...f,
          resourceName: result.data.name || "",
        }));
      } else {
        setResourceFound(null);
        setForm((f) => ({
          ...f,
          resourceName: "",
        }));
      }
    }
  };

  const isButtonDisabled = useMemo(() => loading, [loading]);

  const handleChange = (field, value) =>
    setForm((f) => ({ ...f, [field]: value }));

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
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Typography variant="h6" fontWeight={600}>
            Crear mantenimiento
          </Typography>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>
        <Box display="flex" gap={2} mb={2} sx={{ flexDirection: "column" }}>
          
          <TextField
            label="Tipo de mantenimiento"
            fullWidth
            value={form.type}
            onChange={(e) => handleChange("type", e.target.value)}
          />
          <TextField
            label="Descripción"
            fullWidth
            multiline
            minRows={4}
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />
          <TextField
            label="Número de serie del recurso"
            fullWidth
            value={form.serialNumber}
            inputProps={{
              maxLength: 12,
              style: { textTransform: "uppercase" },
            }}
            onChange={(e) => handleSerialChange(e.target.value)}
            helperText="12 caracteres alfanuméricos (ej: A1B2C3D4E5F6)"
            error={
              !!form.serialNumber && !/^[A-Z0-9]{12}$/.test(form.serialNumber)
            }
          />
         
            <TextField
              label="Nombre del equipo"
              fullWidth
              value={form.resourceName}
              InputProps={{ readOnly: true }}
            />
          
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
