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
import { useProviderStore } from "../../../../hooks";
import { Close } from "@mui/icons-material";

export const ProviderModal = ({
  open,
  onClose,
  provider = {},
  setProvider,
}) => {
  const isEditing = !!provider?._id;
  const { startCreateProvider, startUpdateProvider } = useProviderStore();

  const handleSave = async () => {
    const providerToSave = {
      ...provider,
      status: provider.status || "Activo",
    };

    if (!isEditing) {
      const success = await startCreateProvider(providerToSave);
      if (success) onClose();
    } else {
      const success = await startUpdateProvider(provider._id, providerToSave);
      if (success) onClose();
    }
  };

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
            {isEditing ? "Editar proveedor" : "Agregar proveedor"}
          </Typography>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>

        <Box display="flex" gap={2} mb={2} sx={{ flexDirection: "column" }}>
          <TextField
            label="Nombre"
            fullWidth
            value={provider?.name || ""}
            onChange={(e) => setProvider({ ...provider, name: e.target.value })}
          />
          <TextField
            label="Nombre de contacto"
            fullWidth
            value={provider?.contact_name || ""}
            onChange={(e) =>
              setProvider({ ...provider, contact_name: e.target.value })
            }
          />
          <TextField
            label="Numero"
            fullWidth
            value={provider?.phone || ""}
            onChange={(e) =>
              setProvider({ ...provider, phone: e.target.value })
            }
          />
          <TextField
            label="Email"
            fullWidth
            value={provider?.email || ""}
            onChange={(e) =>
              setProvider({ ...provider, email: e.target.value })
            }
          />

          <FormControl fullWidth>
            <InputLabel id="status-label">Estado</InputLabel>
            <Select
              labelId="status-label"
              id="status"
              value={provider?.status || "Activo"}
              onChange={(e) =>
                setProvider({ ...provider, status: e.target.value })
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
